import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { createVerificationToken } from '@/lib/verification';
import { sendVerificationEmail } from '@/lib/nodemailer';

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    const passwordHash = hashPassword(password);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        name: name ? name.trim() : null,
        passwordHash,
      },
    });

    // Generate 32-byte verification token via crypto.randomBytes(32)
    const { token, numericCode } = await createVerificationToken(normalizedEmail);

    // Send verification email via Nodemailer
    await sendVerificationEmail({
      to: normalizedEmail,
      name: user.name,
      token,
      code: numericCode,
    });

    return NextResponse.json(
      {
        message: 'Account created successfully. Please check your email for your verification code.',
        email: normalizedEmail,
        token, // Included for development convenience
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error in signup API route:', error);
    return NextResponse.json({ error: 'An unexpected error occurred during signup.' }, { status: 500 });
  }
}
