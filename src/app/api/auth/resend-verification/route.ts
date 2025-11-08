import {
  createCommonErrorResponses,
  HttpStatus,
  successResponse,
  validationErrorResponse,
} from "@/lib/api/response";
import { generateVerificationToken } from "@/lib/auth/verification";
import { sendVerificationEmail } from "@/lib/emails/send-verification-email";
import { getLocaleFromRequest } from "@/lib/i18n/utils";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

const resendSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  const locale = await getLocaleFromRequest();
  const t = await getTranslations({ locale });
  const commonErrorResponses = createCommonErrorResponses(t);

  try {
    const body = await request.json();
    const validatedData = resendSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return commonErrorResponses.notFound(t("auth.errors.invalidCredentials"));
    }

    if (user.emailVerified) {
      return commonErrorResponses.badRequest(
        t("auth.verification.alreadyVerified")
      );
    }

    const verificationToken = await generateVerificationToken(user.email);
    const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${verificationToken.token}`;

    await sendVerificationEmail({
      email: user.email,
      name: user.name || "User",
      verificationUrl,
      locale,
    });

    return successResponse(
      { sent: true },
      t("auth.verification.emailSent"),
      HttpStatus.OK
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return validationErrorResponse(error, t);
    }

    console.error("Resend verification error:", error);
    return commonErrorResponses.internalServerError(
      t("auth.verification.error")
    );
  }
}
