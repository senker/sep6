export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/favorites', '/app/:path*', '/other/:path*', '/help/:path*']
} 