import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return new Response('Missing audio URL', { status: 400 });
  }

  try {
    const cloudinaryRes = await fetch(url);
    const headers = new Headers(cloudinaryRes.headers);
    headers.set('Access-Control-Allow-Origin', '*'); // opsional (untuk debugging)

    return new Response(cloudinaryRes.body, {
      status: cloudinaryRes.status,
      headers,
    });
  } catch (err) {
    console.error('Proxy fetch error:', err);
    return new Response('Failed to fetch audio', { status: 500 });
  }
}