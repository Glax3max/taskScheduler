import bcrypt from "bcryptjs";
import userModel from "../models/users.js";
import { signAccessToken } from "../utils/jwt.js";

/**
 * POST /api/v1/user/signup
 */
export async function signup(req, res) {
  const { fname, lname, email, password } = req.validatedBody;

  const existing = await userModel.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fname,
    lname,
    email,
    password: passwordHash,
  });

  const token = signAccessToken({ userId: user._id.toString() });

  return res.status(201).json({
    token,
    user: { id: user._id.toString(), fname: user.fname, lname: user.lname, email: user.email },
  });
}

/**
 * POST /api/v1/user/login
 */
export async function login(req, res) {
  const { email, password } = req.validatedBody;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signAccessToken({ userId: user._id.toString() });
  return res.json({
    token,
    user: { id: user._id.toString(), fname: user.fname, lname: user.lname, email: user.email },
  });
}

/**
 * POST /api/v1/user/logout
 *
 * With stateless JWTs, "logout" is typically handled client-side by deleting the token.
 * This endpoint exists to support a clean UI flow and future token revocation if needed.
 */
export async function logout(req, res) {
  return res.json({ message: "Logged out" });
}

/**
 * GET /api/v1/user/me
 */
export async function getMe(req, res) {
  return res.json({ user: req.user });
}

/**
 * PUT /api/v1/user/me
 */
export async function updateMe(req, res) {
  const { fname, lname } = req.validatedBody;

  const updated = await userModel
    .findByIdAndUpdate(
      req.user.id,
      { ...(fname !== undefined ? { fname } : {}), ...(lname !== undefined ? { lname } : {}) },
      { new: true },
    )
    .select("_id fname lname email");

  return res.json({
    user: { id: updated._id.toString(), fname: updated.fname, lname: updated.lname, email: updated.email },
  });
}

