"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLocale, setLocale } from "@/lib/i18n/actions";
import { type Locale, LOCALE_NAMES } from "@/lib/i18n/constants";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ButtonSkeleton } from "../ui/button-skeleton";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

export function LanguageSwitcher({
  className,
  variant = "ghost",
  size = "icon",
}: LanguageSwitcherProps) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const t = useTranslations("language");

  const handleLocaleChange = (newLocale: Locale) => {
    startTransition(async () => {
      await setLocale(newLocale);
      router.refresh();
    });
  };

  useEffect(() => {
    getLocale().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <ButtonSkeleton size={size} className={className} />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
          disabled={isPending}
        >
          <Languages className="h-5 w-5" />
          <span className="sr-only">{t("switchLanguage")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLocaleChange("en")}>
          <span className="mr-2">🇺🇸</span>
          <span>{LOCALE_NAMES.en}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLocaleChange("tr")}>
          <span className="mr-2">🇹🇷</span>
          <span>{LOCALE_NAMES.tr}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
