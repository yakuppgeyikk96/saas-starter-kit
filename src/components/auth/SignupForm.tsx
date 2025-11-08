"use client";

import { Button } from "@/components/ui/button";
import { ErrorAlert } from "@/components/ui/error-alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import {
  createSignupSchema,
  type SignupFormData,
} from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export function SignupForm() {
  const { signUp, error, isLoading } = useAuth();
  const t = useTranslations();

  const signupSchema = useMemo(() => createSignupSchema(t), [t]);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    const result = await signUp(data);

    if (result.success) {
      form.reset();
    } else {
      form.resetField("password");
      form.resetField("confirmPassword");
    }
  };

  const translatedError = error
    ? error.startsWith("auth.") || error.startsWith("common.")
      ? t(error)
      : error
    : "";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <ErrorAlert
            title={t("common.errors.title")}
            message={translatedError}
          />
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.signup.name")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("auth.signup.namePlaceholder")}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.signup.email")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("auth.signup.emailPlaceholder")}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.signup.password")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("auth.signup.passwordPlaceholder")}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.signup.confirmPassword")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("auth.signup.passwordPlaceholder")}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("auth.signup.submitting") : t("auth.signup.submit")}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          {t("auth.signup.hasAccount")}{" "}
          <Link
            href="/auth/signin"
            className="text-primary hover:underline font-medium"
          >
            {t("auth.signup.signinLink")}
          </Link>
        </div>
      </form>
    </Form>
  );
}
