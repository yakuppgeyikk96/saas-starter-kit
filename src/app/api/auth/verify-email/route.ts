import {
  createCommonErrorResponses,
  HttpStatus,
  successResponse,
} from "@/lib/api/response";
import { deleteVerificationToken, verifyToken } from "@/lib/auth/verification";
import { getLocaleFromRequest } from "@/lib/i18n/utils";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const locale = await getLocaleFromRequest();
  const t = await getTranslations({ locale });
  const commonErrorResponses = createCommonErrorResponses(t);

  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return commonErrorResponses.badRequest(
        t("auth.verification.invalidToken")
      );
    }

    const verificationToken = await verifyToken(token);

    if (!verificationToken) {
      return commonErrorResponses.badRequest(
        t("auth.verification.invalidOrExpiredToken")
      );
    }

    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    });

    await deleteVerificationToken(token);

    return successResponse(
      { verified: true },
      t("auth.verification.emailVerified"),
      HttpStatus.OK
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return commonErrorResponses.internalServerError(
      t("auth.verification.error")
    );
  }
}
