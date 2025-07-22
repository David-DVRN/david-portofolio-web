import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const adminAuth = request.cookies.get('admin_auth')

  // 🔐 Proteksi akses ke /upload jika belum login
  if (url.pathname === '/upload' && adminAuth?.value !== 'true') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/upload', '/', '/about', '/contact'], // urutan TIDAK berpengaruh
}