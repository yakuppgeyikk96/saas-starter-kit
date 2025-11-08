"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("auth.verification");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setStatus("error");
        setMessage(t("invalidToken"));
        return;
      }

      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();
        if (data.success) {
          setStatus("success");
          setMessage(t("emailVerified"));
          setTimeout(() => router.push("/auth/signin"), 3000);
        } else {
          setStatus("error");
          setMessage(data.error?.message || t("error"));
        }
      } catch {
        setStatus("error");
        setMessage(t("error"));
      }
    };

    verifyEmail();
  }, [searchParams, router, t]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {status === "success" ? t("emailVerified") : t("verifying")}
          </CardTitle>
          <CardDescription>
            {status === "loading" && t("verifying")}
            {status === "success" && t("verified")}
            {status === "error" && t("failed")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{message}</p>
          {status === "success" && (
            <p className="text-sm text-muted-foreground">{t("redirecting")}</p>
          )}
          {status === "error" && (
            <Button asChild className="w-full">
              <Link href="/auth/signin">{t("goToSignIn")}</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
