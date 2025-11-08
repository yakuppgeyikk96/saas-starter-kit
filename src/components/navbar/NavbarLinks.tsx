"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarLinksProps {
  className?: string;
}

export function NavbarLinks({ className }: NavbarLinksProps) {
  const t = useTranslations("navbar");
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home") },
    { href: "/dashboard", label: t("dashboard") },
  ];

  return (
    <nav className={className}>
      <ul className="flex items-center gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
