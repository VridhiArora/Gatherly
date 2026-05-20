// ── auth.js ──
// Single source of truth for all auth operations on the frontend.
// Every component that needs to read user info or make authenticated
// API calls should import from here — never read localStorage directly.

const TOKEN_KEY = "gatherly_token"

// Save the JWT received from the server after login
export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token)

// Get the raw token string
export const getToken = () => localStorage.getItem(TOKEN_KEY)

// Decode the JWT payload and return the user object.
// JWTs are three base64 segments: header.payload.signature
// We only read the payload (index [1]) — the server already verified the signature.
export const getUser = () => {
  const token = getToken()
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))

    // Check client-side if token has expired (exp is in seconds)
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      logout()  // clean up expired token
      return null
    }

    return payload  // { userId, username, rollno, session, iat, exp }
  } catch {
    return null  // malformed token — treat as logged out
  }
}

// Returns true if a valid, non-expired token exists
export const isLoggedIn = () => !!getUser()

// Clear the token — logs the user out
export const logout = () => localStorage.removeItem(TOKEN_KEY)

// Returns headers for authenticated API calls.
// Usage:  fetch(url, { headers: authHeaders(), ... })
export const authHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getToken()}`
})
