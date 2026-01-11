import { z } from "zod";

/**
 * Auth/Profile validation schemas.
 *
 * Keep these small and strict so invalid requests fail fast and predictably.
 */

export const signupSchema = z.object({
  fname: z.string().trim().min(1, "First name is required").max(50).optional(),
  lname: z.string().trim().min(1, "Last name is required").max(50).optional(),
  email: z.string().trim().email("Valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Valid email is required"),
  password: z.string().min(1, "Password is required").max(200),
});

export const updateProfileSchema = z.object({
  fname: z.string().trim().min(1).max(50).optional(),
  lname: z.string().trim().min(1).max(50).optional(),
  // If you decide to allow email changes later, do it carefully (re-verify + uniqueness).
});

