"use client";

import { useSession } from "next-auth/react";
import { ButtonSkeleton } from "../ui/button-skeleton";
import { NavbarAuthButtons } from "./NavbarAuthButtons";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarUserMenu } from "./NavbarUserMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Navbar() {
  const { data: session, status } = useSession();
  const isAuthenticated = !!session;
  const isLoading = status === "loading";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center px-4">
        {/* Left Side - Logo + Links */}
        <div className="flex items-center gap-6">
          <NavbarLogo />
          <NavbarLinks className="hidden md:flex" />
        </div>

        {/* Right Side - Desktop */}
        <div className="ml-auto hidden md:flex md:items-center md:gap-4">
          <ThemeSwitcher />
          {isLoading ? (
            <>
              <ButtonSkeleton size="default" />
              <ButtonSkeleton size="default" />
            </>
          ) : isAuthenticated ? (
            <NavbarUserMenu />
          ) : (
            <NavbarAuthButtons />
          )}
        </div>

        {/* Mobile Menu */}
        <div className="ml-auto flex md:hidden">
          <ThemeSwitcher className="mr-2" />
          {!isLoading && isAuthenticated && (
            <div className="mr-2">
              <NavbarUserMenu />
            </div>
          )}
          <NavbarMobileMenu />
        </div>
      </div>
    </header>
  );
}
