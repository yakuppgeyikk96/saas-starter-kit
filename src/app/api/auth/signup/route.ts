import {
  createCommonErrorResponses,
  HttpStatus,
  successResponse,
  validationErrorResponse,
} from "@/lib/api/response";
import { getLocaleFromRequest } from "@/lib/i18n/utils";
import { prisma } from "@/lib/prisma";
import { createSignupSchema } from "@/lib/validations/auth";
import bcrypt from "bcrypt";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export async function POST(request: Request) {
  const locale = await getLocaleFromRequest();
  const t = await getTranslations({ locale });
  const commonErrorResponses = createCommonErrorResponses(t);

  try {
    const body = await request.json();

    const signupSchema = createSignupSchema(t);
    const validatedData = signupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return commonErrorResponses.conflict(t("auth.errors.emailAlreadyExists"));
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return successResponse(
      { user },
      t("auth.errors.accountCreated"),
      HttpStatus.CREATED
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return validationErrorResponse(error, t);
    }

    console.error("Signup error:", error);
    return commonErrorResponses.internalServerError(
      t("auth.errors.signUpError")
    );
  }
}
