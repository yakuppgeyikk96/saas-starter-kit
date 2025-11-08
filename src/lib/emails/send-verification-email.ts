import { FROM_EMAIL, FROM_NAME, resend, TEST_EMAIL } from "./resend";
import { VerificationEmail } from "./templates/verification-email";

interface SendVerificationEmailParams {
  email: string;
  name: string;
  verificationUrl: string;
  locale?: string;
}

export async function sendVerificationEmail({
  email,
  name,
  verificationUrl,
  locale = "en",
}: SendVerificationEmailParams) {
  const emailTemplate = VerificationEmail({
    name,
    verificationUrl,
    locale,
  });

  console.log("FROM_EMAIL", FROM_EMAIL);
  console.log("FROM_NAME", FROM_NAME);
  console.log("TEST_EMAIL", TEST_EMAIL);
  console.log("email", email);

  const { data, error } = await resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: TEST_EMAIL || email,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
    text: emailTemplate.text,
  });

  if (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }

  return data;
}
