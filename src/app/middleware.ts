export { default } from 'next-auth/middleware'

// used for protected routes
export const config = {
  matcher: ['/dashboard', '/app/:path*', '/other/:path*', '/help/:path*']
}