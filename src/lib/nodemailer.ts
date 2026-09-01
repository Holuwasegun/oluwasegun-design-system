import nodemailer from 'nodemailer';

interface SendVerificationEmailParams {
  to: string;
  name?: string | null;
  token: string;
  code?: string;
}

/**
  * Configures the Nodemailer transport dynamically based on environment variables.
  * Defaults to logging fallback if SMTP credentials are missing.
  */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  // Fallback dev transporter (console logger)
  return {
    sendMail: async (options: nodemailer.SendMailOptions) => {
      console.log('----------------------------------------------------');
      console.log('📧 [DEV EMAIL SERVICE] Verification Email Triggered');
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`Text Body:\n${options.text}`);
      console.log('----------------------------------------------------');
      return { messageId: `dev-simulated-${Date.now()}` };
    },
  };
}

/**
  * Sends a verification email containing the verification code generated via crypto.randomBytes(32).
  */
export async function sendVerificationEmail({ to, name, token, code }: SendVerificationEmailParams) {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || process.env.EMAIL_FROM || '"Oluwasegun Design System" <oluwasegunawodeyi@gmail.com>';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const verifyLink = `${appUrl}/verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(to)}`;
  const displayCode = code || token.slice(0, 6).toUpperCase();

  const recipientName = name ? name.trim() : 'there';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
          .card { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .logo { font-size: 20px; font-weight: 700; color: #6750a4; margin-bottom: 24px; }
          h1 { font-size: 22px; font-weight: 700; margin-top: 0; color: #0f172a; }
          p { font-size: 15px; line-height: 1.6; color: #475569; }
          .code-box { background-color: #f1f5f9; border-radius: 8px; border: 1px dashed #cbd5e1; padding: 16px; text-align: center; margin: 24px 0; }
          .code-text { font-family: monospace; font-size: 28px; font-weight: 700; letter-spacing: 4px; color: #6750a4; }
          .btn { display: inline-block; background-color: #6750a4; color: #ffffff !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; margin-top: 16px; }
          .footer { font-size: 12px; color: #94a3b8; margin-top: 32px; border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="logo">Oluwasegun Design System</div>
          <h1>Verify your email address</h1>
          <p>Hi ${recipientName},</p>
          <p>Thank you for signing up! Please use the verification code below or click the link to activate your account:</p>
          
          <div class="code-box">
            <div class="code-text">${displayCode}</div>
          </div>

          <div style="text-align: center;">
            <a href="${verifyLink}" class="btn">Verify Email Address</a>
          </div>

          <p style="margin-top: 24px; font-size: 13px; color: #64748b;">
            Or copy and paste this link into your browser:<br>
            <a href="${verifyLink}" style="color: #6750a4; word-break: break-all;">${verifyLink}</a>
          </p>

          <div class="footer">
            If you did not request this email, you can safely ignore it. This verification link expires in 15 minutes.
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
Hi ${recipientName},

Thank you for signing up for Oluwasegun Design System!

Your verification code is: ${displayCode}

Or verify directly by opening this link:
${verifyLink}

This code expires in 15 minutes.
If you did not create an account, please ignore this message.
  `.trim();

  try {
    return await transporter.sendMail({
      from,
      to,
      subject: `Verify your account - ${displayCode}`,
      text: textContent,
      html: htmlContent,
    });
  } catch (error: unknown) {
    // Never let a mail-delivery failure block account creation. On restricted
    // networks (missing SMTP route, TLS interception) the verification code is
    // surfaced in the server log and the signup response so the flow still works.
    console.warn(
      '⚠️ [Email Warning] Verification email could not be sent. Falling back to server log.\n' +
        `To: ${to}\nCode: ${displayCode}\nVerify link: ${verifyLink}\n` +
        `Reason: ${(error as Error).message}`
    );
    return null;
  }
}
