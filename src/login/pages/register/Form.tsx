import { Button } from "@/components/ui/button";
import { clsx } from "@keycloakify/login-ui/tools/clsx";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import { useLayoutEffect, useState } from "react";
import { assert } from "tsafe/assert";
import { useKcContext } from "@/login/KcContext";
import { UserProfileFormFields } from "@/login/components/UserProfileFormFields";
import { useI18n } from "@/login/i18n";
import { TermsAcceptance } from "./TermsAcceptance";

export function Form() {
  const { kcContext } = useKcContext();
  assert(kcContext.pageId === "register.ftl");
  const { kcClsx } = useKcClsx();
  const { msg, msgStr } = useI18n();

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)["onSubmitRecaptcha"] = () => {
      const form = document.getElementById(
        "kc-register-form"
      ) as HTMLFormElement;
      form?.requestSubmit();
    };

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any)["onSubmitRecaptcha"];
    };
  }, []);

  return (
    <form
      id="kc-register-form"
      action={kcContext.url.registrationAction}
      className="space-y-3"
      method="post"
    >
      <UserProfileFormFields
        onIsFormSubmittableValueChange={setIsFormSubmittable}
      />
      {kcContext.termsAcceptanceRequired && (
        <TermsAcceptance
          messagesPerField={kcContext.messagesPerField}
          areTermsAccepted={areTermsAccepted}
          onAreTermsAcceptedValueChange={setAreTermsAccepted}
        />
      )}
      {kcContext.recaptchaRequired &&
        (kcContext.recaptchaVisible ||
          kcContext.recaptchaAction === undefined) && (
          <div className="form-group">
            <div className={kcClsx("kcInputWrapperClass")}>
              <div
                className="g-recaptcha"
                data-size="compact"
                data-sitekey={kcContext.recaptchaSiteKey}
                data-action={kcContext.recaptchaAction}
              ></div>
            </div>
          </div>
        )}
      <div className={kcClsx("kcFormGroupClass")}>
        {kcContext.recaptchaRequired &&
        !kcContext.recaptchaVisible &&
        kcContext.recaptchaAction !== undefined ? (
          <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
            <button
              className={clsx(
                kcClsx(
                  "kcButtonClass",
                  "kcButtonPrimaryClass",
                  "kcButtonBlockClass",
                  "kcButtonLargeClass"
                ),
                "g-recaptcha"
              )}
              data-sitekey={kcContext.recaptchaSiteKey}
              data-callback="onSubmitRecaptcha"
              data-action={kcContext.recaptchaAction}
              type="submit"
            >
              {msg("doRegister")}
            </button>
          </div>
        ) : (
          <Button
            disabled={
              !isFormSubmittable ||
              (kcContext.termsAcceptanceRequired && !areTermsAccepted)
            }
            className="w-full mt-2"
            name="register"
            type="submit"
          >
            {msgStr("doRegister")}
          </Button>
        )}
      </div>

      <div className=" flex justify-end">
        <Button type="button" variant="ghost">
          <a href={kcContext.url.loginUrl}>{msg("backToLogin")}</a>
        </Button>
      </div>
    </form>
  );
}
