import { ERROR_CODES } from "@/lib/constants";
import { NextResponse } from "next/server";
import { z } from "zod";

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
  };
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export function successResponse<T>(
  data: T,
  message?: string,
  status: number = HttpStatus.OK
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message && { message }),
    },
    { status }
  );
}

export function errorResponse(
  message: string,
  code?: string,
  status: number = HttpStatus.BAD_REQUEST
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        ...(code && { code }),
      },
    },
    { status }
  );
}

export function validationErrorResponse(
  error: z.ZodError,
  t: (key: string) => string,
  status: number = HttpStatus.BAD_REQUEST
): NextResponse<ApiErrorResponse> {
  const firstError = error.issues[0];
  const errorMessage = firstError
    ? `${firstError.path.join(".")}: ${firstError.message}`
    : t("common.errors.validation");

  return NextResponse.json(
    {
      success: false,
      error: {
        message: errorMessage,
        code: ERROR_CODES.VALIDATION_ERROR,
      },
    },
    { status }
  );
}

export const createCommonErrorResponses = (t: (key: string) => string) => ({
  unauthorized: () =>
    errorResponse(
      t("common.errors.unauthorized"),
      ERROR_CODES.UNAUTHORIZED,
      HttpStatus.UNAUTHORIZED
    ),
  forbidden: () =>
    errorResponse(
      t("common.errors.forbidden"),
      ERROR_CODES.FORBIDDEN,
      HttpStatus.FORBIDDEN
    ),
  notFound: (resource: string = t("common.errors.notFound")) =>
    errorResponse(resource, ERROR_CODES.NOT_FOUND, HttpStatus.NOT_FOUND),
  conflict: (message: string) =>
    errorResponse(message, ERROR_CODES.CONFLICT, HttpStatus.CONFLICT),
  internalServerError: (message: string) =>
    errorResponse(
      message,
      ERROR_CODES.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR
    ),
  badRequest: (message: string) =>
    errorResponse(message, ERROR_CODES.BAD_REQUEST, HttpStatus.BAD_REQUEST),
});
