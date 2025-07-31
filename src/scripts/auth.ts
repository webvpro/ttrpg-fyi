// src/utils/auth.ts
export async function getUserFromCookies(cookies: AstroCookies) {
  const token = cookies.get('auth-token')?.value
  if (!token) return null
  
  try {
    // Verify and decode JWT token
    const payload = await verifyJWT(token)
    return {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
      avatar: payload.avatar
    }
  } catch {
    return null
  }
}