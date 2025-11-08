"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { OAuthButtons } from "./OAuthButtons";
import { SignupForm } from "./SignupForm";

export function SignupCard() {
  const t = useTranslations();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {t("auth.signup.title")}
        </CardTitle>
        <CardDescription>{t("auth.signup.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SignupForm />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("auth.oauth.or")}
            </span>
          </div>
        </div>
        <OAuthButtons />
      </CardContent>
    </Card>
  );
}
