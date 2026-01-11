import jwt from "jsonwebtoken";

/**
 * Centralized JWT helpers.
 *
 * - Keeps token creation consistent across signup/login.
 * - Makes it easy to change expiry/audience later without touching controllers.
 */
export function signAccessToken({ userId }) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing");
  }

  // Use `sub` (subject) to store the user id — a common JWT convention.
  return jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
}

