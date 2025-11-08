"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { OAuthButtons } from "./OAuthButtons";

export function LoginCard() {
  const t = useTranslations();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {t("auth.signin.title")}
        </CardTitle>
        <CardDescription>{t("auth.signin.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <LoginForm />
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
        <div className="text-center text-sm text-muted-foreground">
          {t("auth.signin.noAccount")}{" "}
          <Link
            href="/auth/signup"
            className="text-primary hover:underline font-medium"
          >
            {t("auth.signin.signupLink")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
