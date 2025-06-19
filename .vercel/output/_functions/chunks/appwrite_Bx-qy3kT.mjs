import { Client, Account } from 'node-appwrite';

const SESSION_COOKIE = "my-custom-session";
function createAdminClient() {
  const client = new Client().setEndpoint("https://nyc.cloud.appwrite.io/v1").setProject("683760890018c4115afc").setKey("standard_05f0e20d2a8e84f69d77411846a8fdfdba15bebc13be52f4ab2366bdda6113abd6fc9800240996d331ef1d585e73ae24a35cc96dff42db9f9cff314fc098acbb82848d8a3317ebaa0ca7ec746ec5dd0cfd32eca38c6103df2c91bb68989bf341ef098cac89dceaabf934126d54f40b7753fd0dd04762818183f6deb7b7aa140d");
  return {
    get account() {
      return new Account(client);
    }
  };
}
function createSessionClient(request) {
  const client = new Client().setEndpoint("https://nyc.cloud.appwrite.io/v1").setProject("683760890018c4115afc");
  const cookies = parseCookies(request.headers.get("cookie") ?? "");
  const session = cookies.get(SESSION_COOKIE);
  if (!session) {
    throw new Error("No session");
  }
  client.setSession(session);
  return {
    get account() {
      return new Account(client);
    }
  };
}
function parseCookies(cookies) {
  const map = /* @__PURE__ */ new Map();
  for (const cookie of cookies.split(";")) {
    const [name, value] = cookie.split("=");
    map.set(name.trim(), value ?? null);
  }
  return map;
}

export { SESSION_COOKIE as S, createAdminClient as a, createSessionClient as c };
