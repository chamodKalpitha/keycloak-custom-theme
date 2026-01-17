import { assert } from "tsafe/assert";
import { useKcContext } from "@/login/KcContext";
import { Template } from "@/login/components/Template";
import { useI18n } from "@/login/i18n";
import { Form } from "@/login/pages/register/Form";

export function Page() {
  const { kcContext } = useKcContext();
  assert(kcContext.pageId === "register.ftl");

  const { msg, advancedMsg } = useI18n();

  return (
    <Template
      headerNode={
        <div className="text-center">
          <p className="text-2xl font-bold">
            {kcContext.messageHeader !== undefined
              ? advancedMsg(kcContext.messageHeader)
              : msg("registerTitle")}
          </p>
          <p className="text-balance font-normal text-sm text-muted-foreground mt-1">
            {msg("registerSubtitle")}
          </p>
        </div>
      }
      displayMessage={kcContext.messagesPerField.exists("global")}
      displayRequiredFields
    >
      <Form />
    </Template>
  );
}
