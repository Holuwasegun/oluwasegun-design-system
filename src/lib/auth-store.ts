import prisma from '@/lib/prisma';

export interface UserRecord {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationTokenRecord {
  id: string;
  email: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

// Global in-memory fallback store for offline development when PostgreSQL is unreachable
const globalStore = global as unknown as {
  devUsers: Map<string, UserRecord>;
  devTokens: Map<string, VerificationTokenRecord>;
};

if (!globalStore.devUsers) {
  globalStore.devUsers = new Map<string, UserRecord>();
}
if (!globalStore.devTokens) {
  globalStore.devTokens = new Map<string, VerificationTokenRecord>();
}

const devUsers = globalStore.devUsers;
const devTokens = globalStore.devTokens;

/**
 * Finds a user by email with fallback for offline database connectivity.
 */
export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const normalized = email.trim().toLowerCase();
  try {
    const user = await prisma.user.findUnique({
      where: { email: normalized },
    });
    if (user) return user as UserRecord;
  } catch (err: unknown) {
    console.warn('⚠️ [DB Warning] Unreachable database server, using dev fallback store:', (err as Error).message);
  }
  return devUsers.get(normalized) || null;
}

/**
 * Creates a new user record with fallback for offline database connectivity.
 */
export async function createUser(data: {
  email: string;
  name?: string | null;
  passwordHash: string;
}): Promise<UserRecord> {
  const normalized = data.email.trim().toLowerCase();
  try {
    const user = await prisma.user.create({
      data: {
        email: normalized,
        name: data.name || null,
        passwordHash: data.passwordHash,
      },
    });
    return user as UserRecord;
  } catch (err: unknown) {
    console.warn('⚠️ [DB Warning] Could not reach remote DB, storing user in dev memory store:', (err as Error).message);
    const newRecord: UserRecord = {
      id: `dev-user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      email: normalized,
      name: data.name || null,
      passwordHash: data.passwordHash,
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    devUsers.set(normalized, newRecord);
    return newRecord;
  }
}

/**
 * Marks user email as verified.
 */
export async function markUserEmailVerified(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase();
  try {
    await prisma.user.update({
      where: { email: normalized },
      data: { emailVerified: new Date() },
    });
  } catch (err: unknown) {
    console.warn('⚠️ [DB Warning] Updating dev store emailVerified status:', (err as Error).message);
  }

  const devUser = devUsers.get(normalized);
  if (devUser) {
    devUser.emailVerified = new Date();
    devUser.updatedAt = new Date();
    devUsers.set(normalized, devUser);
  }
}

/**
 * Creates and saves verification tokens created via crypto.randomBytes(32).
 */
export async function saveVerificationToken(data: {
  email: string;
  token: string;
  expiresAt: Date;
}): Promise<VerificationTokenRecord> {
  return saveVerificationTokens({
    email: data.email,
    tokens: [data.token],
    expiresAt: data.expiresAt,
  });
}

/**
 * Creates and saves multiple verification tokens/codes for an email.
 */
export async function saveVerificationTokens(data: {
  email: string;
  tokens: string[];
  expiresAt: Date;
}): Promise<VerificationTokenRecord> {
  const normalized = data.email.trim().toLowerCase();
  try {
    await prisma.verificationToken.deleteMany({
      where: { email: normalized },
    });

    const records = await Promise.all(
      data.tokens.map((t) =>
        prisma.verificationToken.create({
          data: {
            email: normalized,
            token: t,
            expiresAt: data.expiresAt,
          },
        })
      )
    );
    return records[0] as VerificationTokenRecord;
  } catch (err: unknown) {
    console.warn('⚠️ [DB Warning] Saving tokens in dev memory store:', (err as Error).message);

    // Delete existing dev tokens for this email
    for (const [key, val] of Array.from(devTokens.entries())) {
      if (val.email === normalized) {
        devTokens.delete(key);
      }
    }

    let firstRecord: VerificationTokenRecord | null = null;
    for (const t of data.tokens) {
      const tokenRecord: VerificationTokenRecord = {
        id: `dev-token-${Date.now()}-${t}`,
        email: normalized,
        token: t,
        expiresAt: data.expiresAt,
        createdAt: new Date(),
      };
      devTokens.set(t, tokenRecord);
      if (!firstRecord) firstRecord = tokenRecord;
    }
    return firstRecord!;
  }
}

/**
 * Finds a verification token record.
 */
export async function findVerificationToken(
  email: string,
  tokenOrCode: string
): Promise<VerificationTokenRecord | null> {
  const normalized = email.trim().toLowerCase();
  const input = tokenOrCode.trim();

  try {
    const record = await prisma.verificationToken.findFirst({
      where: {
        email: normalized,
        token: input,
      },
    });
    if (record) return record as VerificationTokenRecord;
  } catch (err: unknown) {
    console.warn('⚠️ [DB Warning] Querying dev token store:', (err as Error).message);
  }

  // Check dev token store
  const record = devTokens.get(input);
  if (record && record.email === normalized) {
    return record;
  }
  return null;
}

/**
 * Deletes a verification token.
 */
export async function deleteVerificationToken(id: string, tokenString?: string): Promise<void> {
  try {
    await prisma.verificationToken.delete({
      where: { id },
    });
  } catch {
    // Ignore error
  }
  if (tokenString) {
    devTokens.delete(tokenString);
  }
}

/**
 * Deletes all verification tokens for a given email address.
 */
export async function deleteVerificationTokensForEmail(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase();
  try {
    await prisma.verificationToken.deleteMany({
      where: { email: normalized },
    });
  } catch {
    // Ignore error
  }
  for (const [key, val] of Array.from(devTokens.entries())) {
    if (val.email === normalized) {
      devTokens.delete(key);
    }
  }
}

