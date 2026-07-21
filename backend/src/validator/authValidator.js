import { body, validationResult } from "express-validator";

export const registerRules = [
  body("name").notEmpty().isString().trim().withMessage("Name is required."),

  body("email").notEmpty().isEmail().normalizeEmail().withMessage("A valid email is required."),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

export const loginRules = [
  body("email").notEmpty().isEmail().normalizeEmail().withMessage("A valid email is required."),

  body("password").notEmpty().withMessage("Password is required."),
];

export const handleAuthValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
