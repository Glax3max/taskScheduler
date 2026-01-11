/**
 * Central error handler.
 *
 * - Prevents leaking stack traces in production.
 * - Ensures all errors return consistent JSON.
 */
export function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500;

  // Mongoose duplicate key error (e.g., unique email).
  if (err && err.code === 11000) {
    return res.status(409).json({ message: "Resource already exists" });
  }

  // Default safe error response.
  const message = status === 500 ? "Internal server error" : (err.message || "Request failed");

  return res.status(status).json({
    message,
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
  });
}

