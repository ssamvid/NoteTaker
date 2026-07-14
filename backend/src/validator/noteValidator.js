import { body, validationResult } from "express-validator";

export const createNoteRules = [
  body("title").notEmpty().isString().trim().withMessage("Title is required and must be a string"),

  body("body").notEmpty().isString().trim().withMessage("Body is required and must be a string"),

  body("category")
    .notEmpty()
    .isIn(["Personal", "Work", "Study"])
    .withMessage("Category is required and must be one of: Personal, Work, Study"),

  body("pinned").optional().isBoolean().withMessage("Pinned must be a boolean"),
];

export const updateNoteRules = [
  body("title").optional().isString().trim().withMessage("Title must be a string"),

  body("body").optional().isString().trim().withMessage("Body must be a string"),

  body("category")
    .optional()
    .isIn(["Personal", "Work", "Study"])
    .withMessage("Category must be one of: Personal, Work, Study"),

  body("pinned").optional().isBoolean().withMessage("Pinned must be a boolean"),
];

export const handleNoteValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
