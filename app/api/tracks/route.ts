import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const musics = await prisma.musics.findMany();
    return NextResponse.json(musics);
  } catch (error) {
    console.error(error);
    return new NextResponse('Error fetching musics', { status: 500 });
  }
}
