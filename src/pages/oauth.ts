import type { APIRoute } from "astro";
import { createAdminClient, SESSION_COOKIE } from "../server/appwrite";
import { OAuthProvider } from "node-appwrite";

export const POST: APIRoute = async ({ redirect, url, request }) => {
  const { account } = createAdminClient();
  
  // Get the provider from form data or query params
  const formData = await request.formData();
  const provider = formData.get("provider") as string || url.searchParams.get("provider");
  
  let oauthProvider: OAuthProvider;
  
  switch (provider) {
    case "discord":
      oauthProvider = OAuthProvider.Discord;
      break;
    case "github":
    default:
      oauthProvider = OAuthProvider.Github;
      break;
  }

  const redirectUrl = await account.createOAuth2Token(
    oauthProvider,
    `${url.origin}/oauth`, // This should handle the callback
    `${url.origin}/login`  // This is the failure redirect
  );

  return redirect(redirectUrl);
};

export const GET: APIRoute = async ({ cookies, redirect, url }) => {
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
      path: "/",
    });
    
    // Redirect to account page after successful session creation
    return redirect("/account");
  } catch (error) {
    console.error("OAuth session creation failed:", error);
    return redirect("/login?error=oauth_failed", 302);
  }
};
