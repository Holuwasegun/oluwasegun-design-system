import { NextRequest, NextResponse } from 'next/server';
import { getUsers, createUser } from '@/lib/db';
import { CreateUserSchema } from '@/lib/validators';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || undefined;
  const role = searchParams.get('role') || undefined;
  const users = getUsers(search, role);
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = CreateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const user = createUser(parsed.data);
  return NextResponse.json(user, { status: 201 });
}
