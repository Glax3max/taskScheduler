/**
 * Wraps async route handlers so errors flow into Express error middleware.
 *
 * Without this, unhandled promise rejections can slip through and crash the app.
 */
export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

