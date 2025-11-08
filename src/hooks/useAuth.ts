"use client";

import { ApiResponse } from "@/lib/api/response";
import type { LoginFormData, SignupFormData } from "@/lib/validations/auth";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UseAuthReturn {
  signIn: (
    data: LoginFormData
  ) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    data: SignupFormData
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  signInWithOAuth: (provider: "google" | "github") => void;
  isLoading: boolean;
  error: string;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (
    data: LoginFormData
  ): Promise<{ success: boolean; error?: string }> => {
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        // Translation key'leri döndür, component'lerde translate edilecek
        const errorKey =
          result.error === "CredentialsSignin"
            ? "auth.errors.invalidCredentials"
            : result.error === "OAuthCreateAccount"
            ? "auth.errors.oauthCreateAccount"
            : "auth.errors.signInError";

        setError(errorKey);
        return { success: false, error: errorKey };
      }

      if (result?.ok) {
        router.push("/");
        router.refresh();
        return { success: true };
      }

      setError("auth.errors.signInError");
      return { success: false, error: "auth.errors.signInError" };
    } catch (error) {
      console.error("Sign in error:", error);
      setError("auth.errors.signInErrorRetry");
      return { success: false, error: "auth.errors.signInErrorRetry" };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (
    data: SignupFormData
  ): Promise<{ success: boolean; error?: string }> => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result: ApiResponse = await response.json();

      if (!result.success) {
        // API'den gelen mesajı direkt kullan (zaten localized olacak)
        const errorMessage = result.error.message || "auth.errors.signUpError";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      const signInResult = await handleSignIn({
        email: data.email,
        password: data.password,
      });

      return signInResult;
    } catch (error) {
      console.error("Sign up error:", error);
      setError("auth.errors.signUpErrorRetry");
      return { success: false, error: "auth.errors.signUpErrorRetry" };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    setError("");
    setIsLoading(true);

    try {
      await signOut({ redirect: false });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      setError("auth.errors.signOutError");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithOAuth = (provider: "google" | "github"): void => {
    setError("");
    signIn(provider, { callbackUrl: "/" });
  };

  return {
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    signInWithOAuth: handleSignInWithOAuth,
    isLoading,
    error,
  };
}
