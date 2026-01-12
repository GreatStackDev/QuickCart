import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/api/webhooks/clerk(.*)', // ← Ruta del webhook de Clerk
  '/api/inngest(.*)',         // ← Ruta de Inngest
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    (await auth()).protect();
  }
});

export const config = {
  matcher:  [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};