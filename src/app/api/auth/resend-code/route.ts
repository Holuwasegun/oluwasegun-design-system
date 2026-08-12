import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/auth-store';
import { createVerificationToken } from '@/lib/verification';
import { sendVerificationEmail } from '@/lib/nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return NextResponse.json({ error: 'No account found with this email address.' }, { status: 444 });
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: 'Account is already verified.' });
    }

    // Generate fresh token using crypto.randomBytes(32)
    const { token, numericCode } = await createVerificationToken(normalizedEmail);

    // Resend email via Nodemailer
    await sendVerificationEmail({
      to: normalizedEmail,
      name: user.name,
      token,
      code: numericCode,
    });

    return NextResponse.json({
      message: 'A new verification code has been sent to your email.',
    });
  } catch (error: unknown) {
    console.error('Error in resend code API route:', error);
    return NextResponse.json({ error: 'Failed to resend verification code.' }, { status: 500 });
  }
}
