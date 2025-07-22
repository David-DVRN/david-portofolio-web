import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL('/', req.url))
  response.cookies.set('admin_auth', '', {
    path: '/',
    expires: new Date(0),
  });
  return response
}
