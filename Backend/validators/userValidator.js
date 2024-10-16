const { check, validationResult } = require("express-validator");

const validateRegisterUser = [
  check("username", "Username is required").not().isEmpty(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
  check("role", "Role is required").not().isEmpty(),
  check("role", "Invalid role").isIn(["user", "admin"]),
];

const validateLoginUser = [
  check("username", "Username is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
];

const validationResultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegisterUser,
  validateLoginUser,
  validationResultHandler,
};
