
export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.validatedData = parsed;
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: err.errors.map(e => ({
        field: e.path[0],
        message: e.message
      }))
    });
  }
};
