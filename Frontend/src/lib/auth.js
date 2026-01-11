/**
 * Tiny auth token helper.
 *
 * For this assignment we store the JWT in localStorage.
 * In production you might choose httpOnly cookies + CSRF protection instead.
 */
const TOKEN_KEY = "access_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

