import { NextResponse } from 'next/server';
import { verifyUserToken } from '@/lib/verification';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code, token } = body;

    const inputCode = token || code;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }

    if (!inputCode || typeof inputCode !== 'string') {
      return NextResponse.json({ error: 'Verification code or token is required.' }, { status: 400 });
    }

    const result = await verifyUserToken(email, inputCode);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Email address verified successfully. You can now log in.',
    });
  } catch (error: unknown) {
    console.error('Error in verify API route:', error);
    return NextResponse.json({ error: 'Failed to verify code. Please try again.' }, { status: 500 });
  }
}
