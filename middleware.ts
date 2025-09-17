import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  console.log('Middleware triggered for:', url.pathname)
  
  // Rewrite sitemap URLs với .xml extension về route thực tế
  if (url.pathname.match(/^\/sitemap-movies-(\d+)\.xml$/)) {
    const batch = url.pathname.match(/^\/sitemap-movies-(\d+)\.xml$/)?.[1]
    console.log('Rewriting movie sitemap:', url.pathname, '-> /sitemap-movies-' + batch)
    url.pathname = `/sitemap-movies-${batch}`
    return NextResponse.rewrite(url)
  }
  
  if (url.pathname.match(/^\/sitemap-tv-(\d+)\.xml$/)) {
    const batch = url.pathname.match(/^\/sitemap-tv-(\d+)\.xml$/)?.[1]
    console.log('Rewriting TV sitemap:', url.pathname, '-> /sitemap-tv-' + batch)
    url.pathname = `/sitemap-tv-${batch}`
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}