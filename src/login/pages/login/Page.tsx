import { assert } from "tsafe/assert";
import { Template } from "@/login/components/Template";
import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { Form } from "@/login/pages/login/Form";
import { Info } from "@/login/pages/login/Info";
import { SocialProviders } from "@/login/pages/login/SocialProviders";

export function Page() {
  const { kcContext } = useKcContext();
  assert(kcContext.pageId === "login.ftl");

  const { msg } = useI18n();

  return (
    <Template
      displayMessage={
        !kcContext.messagesPerField.existsError("username", "password")
      }
      headerNode={
        <div className="text-center">
          <p className="text-2xl font-bold">{msg("loginAccountTitle")}</p>
          <p className="text-balance font-normal text-sm text-muted-foreground mt-1">
            {msg("enterCredentials")}
          </p>
        </div>
      }
      displayInfo={
        kcContext.realm.password &&
        kcContext.realm.registrationAllowed &&
        !kcContext.registrationDisabled
      }
      infoNode={<Info />}
      socialProvidersNode={
        kcContext.realm.password &&
        kcContext.social !== undefined && <SocialProviders />
      }
    >
      <Form />
    </Template>
  );
}
