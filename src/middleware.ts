import { defineMiddleware } from "astro:middleware";
import { createSessionClient } from "./server/appwrite";
import type { Models } from "node-appwrite";

export const onRequest = defineMiddleware(async ({ request, locals, url }, next) => {
  // Skip authentication entirely for prerendered compendium pages
  if (url.pathname.startsWith('/compendium/')) {
    locals.user = undefined;
    return next();
  }

  // Only run authentication for server-rendered pages
  try {
    const { account } = createSessionClient(request);
    const user = await account.get() as Models.User<Models.Preferences>;
    locals.user = user;
  } catch (error) {
    // User is not authenticated
    locals.user = undefined;
  }

  return next();
});
