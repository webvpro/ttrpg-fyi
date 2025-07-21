import { Client, Account, Databases } from "node-appwrite";
export const SESSION_COOKIE = "rpg-fyi-session";

const client = new Client();

// Get environment variables with fallbacks
const endpoint =
  import.meta.env.PUBLIC_APPWRITE_ENDPOINT ||
  process.env.PUBLIC_APPWRITE_ENDPOINT ||
  "https://cloud.appwrite.io/v1";
const projectId =
  import.meta.env.PUBLIC_APPWRITE_PROJECT_ID ||
  process.env.PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = import.meta.env.APPWRITE_KEY || process.env.APPWRITE_KEY;

console.log("Appwrite config check:", {
  hasEndpoint: !!endpoint,
  hasProjectId: !!projectId,
  hasApiKey: !!apiKey,
  endpoint: endpoint,
});

// Validate required environment variables
if (!endpoint || typeof endpoint !== "string") {
  throw new Error("APPWRITE_ENDPOINT is required and must be a string");
}

if (!projectId || typeof projectId !== "string") {
  throw new Error("APPWRITE_PROJECT_ID is required and must be a string");
}

try {
  client.setEndpoint(endpoint).setProject(projectId);

  if (apiKey) {
    client.setKey(apiKey);
  }
} catch (error) {
  console.error("Failed to initialize Appwrite client:", error);
  throw error;
}

export function createAdminClient() {
  return {
    get account() {
      return new Account(client);
    },
  };
}

export function createSessionClient(request: Request) {
  const client = new Client()
    .setEndpoint(import.meta.env.PUBLIC_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT_ID);

  const cookies = parseCookies(request.headers.get("cookie") ?? "");
  const session = cookies.get(SESSION_COOKIE);
  if (!session) {
    throw new Error("No session");
  }

  client.setSession(session);

  return {
    get account() {
      return new Account(client);
    },
  };
}

function parseCookies(cookies: string): Map<string, string | null> {
  const map = new Map<string, string | null>();
  for (const cookie of cookies.split(";")) {
    const [name, value] = cookie.split("=");
    map.set(name.trim(), value ?? null);
  }
  return map;
}

export const account = new Account(client);
export const databases = new Databases(client);
export { client };
