export const schemaValidator = (schema) => async (req, res, next) => {
  try {
    const body = req.body;

    schema.parse(body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.errors.map((e) => e.message) });
  }
};
