import { NextRequest, NextResponse } from 'next/server';
import { getAnalytics } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || undefined;
  const analytics = getAnalytics(period);
  return NextResponse.json(analytics);
}
