import crypto from 'crypto';
import prisma from '@/lib/prisma';

/**
  * Generates a 32-byte random verification code using Node.js crypto.randomBytes(32).
  */
export function generateVerificationCode(): { rawToken: string; hexToken: string; numericCode: string } {
  // Generate 32 bytes of secure random cryptographic bytes
  const bytes = crypto.randomBytes(32);
  const hexToken = bytes.toString('hex'); // 64 hex characters representing 32 bytes

  // Generate a 6-digit verification code derived securely from crypto.randomBytes
  const randomValue = bytes.readUInt32BE(0);
  const numericCode = (100000 + (randomValue % 900000)).toString();

  return {
    rawToken: hexToken,
    hexToken,
    numericCode,
  };
}

/**
  * Creates and stores a new verification token for the specified user email.
  * Token expires in 24 hours.
  */
export async function createVerificationToken(email: string) {
  const { hexToken, numericCode } = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Delete existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { email },
  });

  // Store new token created via crypto.randomBytes(32)
  const tokenRecord = await prisma.verificationToken.create({
    data: {
      email,
      token: hexToken,
      expiresAt,
    },
  });

  return {
    tokenRecord,
    token: hexToken,
    numericCode,
  };
}

/**
  * Validates a verification token or code against stored database record.
  */
export async function verifyUserToken(email: string, tokenOrCode: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const inputToken = tokenOrCode.trim();

  // Find verification token match
  const record = await prisma.verificationToken.findFirst({
    where: {
      email: normalizedEmail,
      token: inputToken,
    },
  });

  if (!record) {
    return { success: false, error: 'Invalid verification token or code.' };
  }

  if (record.expiresAt < new Date()) {
    // Delete expired token
    await prisma.verificationToken.delete({ where: { id: record.id } });
    return { success: false, error: 'Verification code has expired. Please request a new code.' };
  }

  // Update user as email verified
  await prisma.user.update({
    where: { email: normalizedEmail },
    data: { emailVerified: new Date() },
  });

  // Delete used token
  await prisma.verificationToken.delete({ where: { id: record.id } });

  return { success: true };
}
