import { Languages } from "@/components/langauges";
import { ModeToggle } from "@/components/theme-toggle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { redirectUrlOrigin } from "@/login/shared/redirectUrlOrigin";
import { kcSanitize } from "@keycloakify/login-ui/kcSanitize";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { RotateCcw, Dot } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import companylogoLight from "@/login/assets/img/logo-light.svg";
import companylogoDark from "@/login/assets/img/logo-dark.svg";
import shape from "@/login/assets/img/shape.svg";
import { useInitializeTemplate } from "@/login/components/Template/useInitializeTemplate";
import { CarouselWithDots } from "@/login/components/CarouselWithDots";
import { useTheme } from "@/components/theme-provider";

export function Template(props: {
  displayInfo?: boolean;
  displayMessage?: boolean;
  displayRequiredFields?: boolean;
  headerNode: ReactNode;
  socialProvidersNode?: ReactNode;
  infoNode?: ReactNode;
  documentTitle?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    bodyClassName,
    children,
  } = props;

  const { theme } = useTheme();

  const { kcContext } = useKcContext();

  const { auth, url, message, isAppInitiatedAction } = kcContext;

  const { msg, msgStr, enabledLanguages } = useI18n();

  const { kcClsx } = useKcClsx();

  useEffect(() => {
    document.title =
      documentTitle ??
      msgStr("loginTitle", kcContext.realm.displayName || kcContext.realm.name);
  }, []);

  useSetClassName({
    qualifiedName: "html",
    className: kcClsx("kcHtmlClass"),
  });

  useSetClassName({
    qualifiedName: "body",
    className: bodyClassName ?? kcClsx("kcBodyClass"),
  });

  const { isReadyToRender } = useInitializeTemplate();

  if (!isReadyToRender) {
    return null;
  }

  return (
    <div className="grid  lg:grid-cols-2 h-screen bg-white dark:bg-background lg:bg-transparent ">
      <div className=" flex flex-col justify-between gap-10 bg-white dark:bg-background px-2 pt-2 lg:px-4 lg:pt-2">
        {/* Logo & Language */}
        <div className="flex justify-between">
          <a href={kcContext.client.baseUrl ?? redirectUrlOrigin}>
            <img
              src={theme === "dark" ? companylogoDark : companylogoLight}
              alt="Logo"
              className="h-10"
            />
          </a>
          <div className="flex gap-2">
            {enabledLanguages.length > 1 && <Languages />}{" "}
            {kcContext.darkMode !== false && <ModeToggle />}
          </div>
        </div>
        <div className="flex justify-center">
          <Card className="w-full lg:w-3/4 xl:max-w-2xl border-none shadow-none bg-white dark:bg-background mx-auto lg:mx-0 p-0">
            <CardHeader className="text-center px-0">
              <CardTitle>
                {(() => {
                  const node = !(
                    auth !== undefined &&
                    auth.showUsername &&
                    !auth.showResetCredentials
                  ) ? (
                    <h1 className="text-xl">{headerNode}</h1>
                  ) : (
                    <div
                      id="kc-username"
                      className="flex items-center justify-center gap-2"
                    >
                      <label
                        className="font-semibold text-lg"
                        id="kc-attempted-username"
                      >
                        {auth.attemptedUsername}
                      </label>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" asChild>
                              <a
                                id="reset-login"
                                href={url.loginRestartFlowUrl}
                                aria-label={msgStr("restartLoginTooltip")}
                              >
                                <RotateCcw className="h-4 w-4" />
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{msg("restartLoginTooltip")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  );

                  return node;
                })()}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div id="kc-content">
                {displayRequiredFields && (
                  <div className="flex items-center justify-end gap-2">
                    <div>
                      <span className="subtitle font-semibold">
                        <span className="text-red-500 mr-1">*</span>
                        {msg("requiredFields")}
                      </span>
                    </div>
                  </div>
                )}

                <div id="kc-content-wrapper">
                  {displayMessage &&
                    message !== undefined &&
                    (message.type !== "warning" || !isAppInitiatedAction) && (
                      <Alert variant={message.type} className="my-3">
                        <AlertDescription>
                          <div>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: kcSanitize(message.summary),
                              }}
                            />
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                  <div className="children">{children}</div>
                  {socialProvidersNode}
                  {auth !== undefined && auth.showTryAnotherWayLink && (
                    <form
                      id="kc-select-try-another-way-form"
                      action={url.loginAction}
                      method="post"
                    >
                      <div className={kcClsx("kcFormGroupClass")}>
                        <input type="hidden" name="tryAnotherWay" value="on" />
                        <a
                          href="#"
                          id="try-another-way"
                          onClick={(event) => {
                            document.forms[
                              "kc-select-try-another-way-form" as never
                            ].submit();
                            event.preventDefault();
                            return false;
                          }}
                        >
                          {msg("doTryAnotherWay")}
                        </a>
                      </div>
                    </form>
                  )}
                  {displayInfo && (
                    <div className="text-center text-sm mt-4">{infoNode}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Footer */}
        <div className="flex justify-between items-center">
          <p className="text-xs font-light">
            © 2025 Firstbase.io, Inc. All rights reserved.
          </p>
          <div className="flex items-center">
            <Button variant="link" asChild>
              <a
                href="https://firstbase.io/privacy"
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm p-0!"
              >
                Privacy Policy
              </a>
            </Button>
            <span className="mx-2 inline">
              <Dot size={16} />
            </span>
            <Button variant="link" asChild>
              <a
                href="https://firstbase.io/terms"
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm p-0!"
              >
                Terms of Service
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-slate-950 relative hidden lg:block dark:bg-slate-950 overflow-hidden">
        <div className="absolute right-0 top-0 w-full max-w-62.5 xl:max-w-112.5 opacity-30">
          <img src={shape} alt="grid" />
        </div>
        <div className="absolute bottom-0 left-0 w-full max-w-62.5 rotate-180 xl:max-w-112.5 opacity-30">
          <img src={shape} alt="grid" />
        </div>

        <div className="relative z-10 h-full p-4 flex items-center justify-center ">
          <div>
            <CarouselWithDots />
          </div>
        </div>
      </div>
    </div>
  );
}
