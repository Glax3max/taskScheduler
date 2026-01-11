import jwt from "jsonwebtoken";
import userModel from "../models/users.js";

/**
 * JWT auth middleware (protects routes).
 *
 * Expects header: Authorization: Bearer <token>
 * On success, attaches `req.user` (a safe subset) for downstream handlers.
 */
export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Unauthorized: missing or invalid Authorization header",
      });
    }

    if (!process.env.JWT_SECRET) {
      // Fail fast so we don't accidentally run in an insecure state.
      return res.status(500).json({ message: "Server misconfigured: JWT_SECRET missing" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // We re-fetch the user to ensure they still exist and to keep a consistent "me" payload.
    const user = await userModel.findById(payload.sub).select("_id fname lname email");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    req.user = {
      id: user._id.toString(),
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    };

    return next();
  } catch (err) {
    // Token issues should be a 401, not a 500.
    return res.status(401).json({ message: "Unauthorized: invalid or expired token" });
  }
}

