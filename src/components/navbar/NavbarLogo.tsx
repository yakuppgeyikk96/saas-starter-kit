"use client";

import Link from "next/link";

interface NavbarLogoProps {
  className?: string;
}

export function NavbarLogo({ className }: NavbarLogoProps) {
  return (
    <Link href="/" className={className}>
      <span className="text-xl font-bold">SaaS Starter</span>
    </Link>
  );
}
