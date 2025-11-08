import { z } from "zod";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants";

type TranslationFunction = (key: string) => string;

export const createLoginSchema = (t: TranslationFunction) =>
  z.object({
    email: z
      .string()
      .min(1, t("validation.email.required"))
      .regex(EMAIL_REGEX, t("validation.email.invalid")),
    password: z
      .string()
      .min(1, t("validation.password.required"))
      .regex(PASSWORD_REGEX, t("validation.password.minLength")),
  });

export const createSignupSchema = (t: TranslationFunction) =>
  z
    .object({
      name: z
        .string()
        .min(1, t("validation.name.required"))
        .min(2, t("validation.name.minLength")),
      email: z
        .string()
        .min(1, t("validation.email.required"))
        .regex(EMAIL_REGEX, t("validation.email.invalid")),
      password: z
        .string()
        .min(1, t("validation.password.required"))
        .regex(PASSWORD_REGEX, t("validation.password.minLength")),
      confirmPassword: z
        .string()
        .min(1, t("validation.confirmPassword.required"))
        .regex(PASSWORD_REGEX, t("validation.confirmPassword.minLength")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.confirmPassword.mismatch"),
      path: ["confirmPassword"],
    });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
export type SignupFormData = z.infer<ReturnType<typeof createSignupSchema>>;
