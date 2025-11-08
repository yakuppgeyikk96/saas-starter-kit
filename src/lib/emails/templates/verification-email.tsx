interface VerificationEmailProps {
  name: string;
  verificationUrl: string;
  locale?: string;
}

export function VerificationEmail({
  name,
  verificationUrl,
  locale = "en",
}: VerificationEmailProps) {
  const translations = {
    en: {
      subject: "Verify your email address",
      greeting: "Hello",
      message: "Please click the button below to verify your email address:",
      button: "Verify Email",
      alternative: "Or copy and paste this URL into your browser:",
      footer:
        "If you didn't create an account, you can safely ignore this email.",
    },
    tr: {
      subject: "E-posta adresinizi doğrulayın",
      greeting: "Merhaba",
      message:
        "E-posta adresinizi doğrulamak için lütfen aşağıdaki butona tıklayın:",
      button: "E-postayı Doğrula",
      alternative: "Veya bu URL'yi tarayıcınıza kopyalayıp yapıştırın:",
      footer:
        "Eğer bir hesap oluşturmadıysanız, bu e-postayı güvenle yok sayabilirsiniz.",
    },
  };

  const t =
    translations[locale as keyof typeof translations] || translations.en;

  return {
    subject: t.subject,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">${t.subject}</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>${t.greeting} ${name},</p>
            <p>${t.message}</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">${t.button}</a>
            </div>
            <p style="font-size: 12px; color: #666;">${t.alternative}</p>
            <p style="font-size: 12px; color: #666; word-break: break-all;">${verificationUrl}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">${t.footer}</p>
          </div>
        </body>
      </html>
    `,
    text: `
${t.greeting} ${name},

${t.message}

${t.button}: ${verificationUrl}

${t.alternative}
${verificationUrl}

${t.footer}
    `.trim(),
  };
}
