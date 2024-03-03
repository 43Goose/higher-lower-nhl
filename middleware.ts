export { default } from 'next-auth/middleware';

// Controls which routes require authentication
export const config = { matcher: ['/dashboard', '/api/player'] };