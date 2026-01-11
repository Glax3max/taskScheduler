import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { loginSchema, signupSchema, updateProfileSchema } from "../validators/userSchemas.js";
import { getMe, login, logout, signup, updateMe } from "../controllers/userController.js";

const router = express.Router();

// Auth
router.post("/signup", validateBody(signupSchema), asyncHandler(signup));
router.post("/login", validateBody(loginSchema), asyncHandler(login));
router.post("/logout", requireAuth, asyncHandler(logout));

// Profile
router.get("/me", requireAuth, asyncHandler(getMe));
router.put("/me", requireAuth, validateBody(updateProfileSchema), asyncHandler(updateMe));

export default router;