// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const cspHeader = `
    frame-ancestors https://dashboard.assembly.com https://*.copilot.app https://*.myassembly.com;
    frame-src https://app.hex.tech https://*.hex.tech;
  `.replace(/\n/g, ' ').trim()

  response.headers.set('Content-Security-Policy', cspHeader)

  return response
}

export const config = {
  matcher: '/:path*',
}
