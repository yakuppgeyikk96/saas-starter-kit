"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarMobileMenuProps {
  className?: string;
}

export function NavbarMobileMenu({ className }: NavbarMobileMenuProps) {
  const { data: session } = useSession();
  const { signOut } = useAuth();
  const t = useTranslations("navbar");
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home") },
    { href: "/dashboard", label: t("dashboard") },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sheet>
      <SheetTrigger asChild className={className}>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("openMenu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{t("menu")}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <nav className="px-3">
            <ul className="flex flex-col gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Separator />

          {session?.user ? (
            <div className="flex flex-col gap-2 px-3">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">
                  {session.user.name || "User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
              <Separator />
              <Link
                href="/profile"
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {t("profile")}
              </Link>
              <Link
                href="/settings"
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {t("settings")}
              </Link>
              <Separator />
              <button
                onClick={handleSignOut}
                className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {t("signOut")}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 px-3">
              <Button variant="outline" asChild>
                <Link href="/auth/signin">{t("signIn")}</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">{t("signUp")}</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
