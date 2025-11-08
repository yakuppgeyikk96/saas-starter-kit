"use client";

import { IconGithub, IconGoogle } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";

export function OAuthButtons() {
  const { signInWithOAuth } = useAuth();
  const t = useTranslations();

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => signInWithOAuth("google")}
      >
        <IconGoogle className="size-5" />
        {t("auth.oauth.google")}
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => signInWithOAuth("github")}
      >
        <IconGithub className="size-5" />
        {t("auth.oauth.github")}
      </Button>
    </div>
  );
}
