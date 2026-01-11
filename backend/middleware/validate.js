/**
 * Small validation helper for request bodies.
 *
 * We use Zod schemas to validate incoming JSON and keep controllers clean.
 * If validation fails, we respond with a human-friendly 400.
 */
export function validateBody(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation error",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
    }

    // Keep the "validated" version so controllers don't have to re-check.
    req.validatedBody = parsed.data;
    return next();
  };
}

