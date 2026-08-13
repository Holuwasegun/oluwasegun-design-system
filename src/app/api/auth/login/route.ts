import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { findUserByEmail } from '@/lib/auth-store';

function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, originalHash] = storedHash.split(':');
  if (!salt || !originalHash) return false;

  let expected: Buffer;
  try {
    expected = Buffer.from(originalHash, 'hex');
  } catch {
    return false;
  }

  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  const actual = Buffer.from(hash, 'hex');

  // timingSafeEqual throws when the buffers differ in length; treat any
  // malformed stored hash as a failed login rather than a 500.
  if (expected.length !== actual.length) return false;
  return crypto.timingSafeEqual(actual, expected);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await findUserByEmail(normalizedEmail);

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const isValid = verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        {
          error: 'Please verify your email address before logging in.',
          requiresVerification: true,
          email: normalizedEmail,
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      message: 'Login successful.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: unknown) {
    console.error('Error in login API route:', error);
    return NextResponse.json({ error: 'An unexpected error occurred during login.' }, { status: 500 });
  }
}
