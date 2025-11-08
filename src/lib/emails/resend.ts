import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
export const FROM_NAME = process.env.FROM_NAME || "SaaS Starter Kit";
export const TEST_EMAIL = process.env.TEST_EMAIL || "test@test.com";
