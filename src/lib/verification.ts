import crypto from 'crypto';
import {
  saveVerificationToken,
  findVerificationToken,
  markUserEmailVerified,
  deleteVerificationToken,
} from '@/lib/auth-store';

/**
 * Generates a 32-byte random verification code using Node.js crypto.randomBytes(32).
 */
export function generateVerificationCode(): { rawToken: string; hexToken: string; numericCode: string } {
  const bytes = crypto.randomBytes(32);
  const hexToken = bytes.toString('hex'); // 64 hex characters representing 32 bytes

  const randomValue = bytes.readUInt32BE(0);
  const numericCode = (100000 + (randomValue % 900000)).toString();

  return {
    rawToken: hexToken,
    hexToken,
    numericCode,
  };
}

/**
 * Creates and stores a new verification token generated via crypto.randomBytes(32).
 * Expires in 24 hours.
 */
export async function createVerificationToken(email: string) {
  const { hexToken, numericCode } = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const tokenRecord = await saveVerificationToken({
    email,
    token: hexToken,
    expiresAt,
  });

  return {
    tokenRecord,
    token: hexToken,
    numericCode,
  };
}

/**
 * Validates a verification token or code against stored records.
 */
export async function verifyUserToken(email: string, tokenOrCode: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const inputToken = tokenOrCode.trim();

  const record = await findVerificationToken(normalizedEmail, inputToken);

  if (!record) {
    return { success: false, error: 'Invalid verification token or code.' };
  }

  if (record.expiresAt < new Date()) {
    await deleteVerificationToken(record.id, record.token);
    return { success: false, error: 'Verification code has expired. Please request a new code.' };
  }

  await markUserEmailVerified(normalizedEmail);
  await deleteVerificationToken(record.id, record.token);

  return { success: true };
}
