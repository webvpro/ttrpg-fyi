import { a as createAdminClient, S as SESSION_COOKIE } from '../chunks/appwrite_CdyEDrVh.mjs';
import { OAuthProvider } from 'node-appwrite';
export { renderers } from '../renderers.mjs';

const POST = async ({ redirect, url }) => {
  const { account } = createAdminClient();
  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    `${url.origin}/oauth`,
    // This should handle the callback
    `${url.origin}/login`
    // This is the failure redirect
  );
  return redirect(redirectUrl);
};
const GET = async ({ cookies, redirect, url }) => {
  const userId = url.searchParams.get("userId");
  const secret = url.searchParams.get("secret");
  if (!userId || !secret) {
    throw new Error("OAuth2 did not provide userId or secret");
  }
  const { account } = createAdminClient();
  try {
    const session = await account.createSession(userId, secret);
    if (!session || !session.secret) {
      throw new Error("Failed to create session from token");
    }
    cookies.set(SESSION_COOKIE, session.secret, {
      sameSite: "strict",
      expires: new Date(session.expire),
      secure: true,
      httpOnly: true,
      path: "/"
    });
    return redirect("/account");
  } catch (error) {
    console.error("OAuth session creation failed:", error);
    return redirect("/login?error=oauth_failed", 302);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
