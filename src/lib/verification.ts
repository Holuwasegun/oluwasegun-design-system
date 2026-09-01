import crypto from 'crypto';
import {
  saveVerificationTokens,
  findVerificationToken,
  markUserEmailVerified,
  deleteVerificationTokensForEmail,
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
 * Creates and stores new verification tokens generated via crypto.randomBytes(32).
 * Stores both hexToken (for URL links) and numericCode (for 6-digit input form).
 * Expires in 15 minutes.
 */
export async function createVerificationToken(email: string) {
  const { hexToken, numericCode } = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  const tokenRecord = await saveVerificationTokens({
    email,
    tokens: [hexToken, numericCode],
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
    await deleteVerificationTokensForEmail(normalizedEmail);
    return { success: false, error: 'Verification code has expired. Please request a new code.' };
  }

  await markUserEmailVerified(normalizedEmail);
  await deleteVerificationTokensForEmail(normalizedEmail);

  return { success: true };
}

