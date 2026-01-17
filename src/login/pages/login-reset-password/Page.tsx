import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { assert } from "tsafe/assert";
import { Template } from "@/login/components/Template";
import { Form } from "@/login/pages/login-reset-password/Form";

export function Page() {
  const { kcContext } = useKcContext();
  assert(kcContext.pageId === "login-reset-password.ftl");

  const { msg } = useI18n();

  return (
    <Template
      displayMessage={!kcContext.messagesPerField.existsError("username")}
      headerNode={
        <div className="text-center">
          <p className="text-2xl font-bold">{msg("emailForgotTitle")}</p>
          <p className="text-balance font-normal text-sm text-muted-foreground mt-1">
            {kcContext.realm.duplicateEmailsAllowed
              ? msg("emailInstructionUsername")
              : msg("emailInstruction")}
          </p>
        </div>
      }
    >
      <Form />
    </Template>
  );
}
