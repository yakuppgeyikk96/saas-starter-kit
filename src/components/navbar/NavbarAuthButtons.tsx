"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface NavbarAuthButtonsProps {
  className?: string;
}

export function NavbarAuthButtons({ className }: NavbarAuthButtonsProps) {
  const t = useTranslations("navbar");

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button variant="ghost" asChild>
        <Link href="/auth/signin">{t("signIn")}</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/signup">{t("signUp")}</Link>
      </Button>
    </div>
  );
}
