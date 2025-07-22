import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const id = parseInt(context.params.id);
  try {
    await prisma.musics.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete gagal' }, { status: 500 });
  }
}