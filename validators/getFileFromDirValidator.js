const { check, param } = require("express-validator");

exports.getFileFromDirValidator = [
  check("set")
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage("set number is required")
    .isAlphanumeric()
    .withMessage("set can only include alphabets or numbers"),
  check("size")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("size is required")
    .isAlpha()
    .withMessage(
      "size can only include: tiny, small, med, big, large, or full."
    ),
  check("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("name is required")
    .isAlpha()
    .withMessage("name must include alphabets only."),
  check("fileType")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("format is required and can only include png or webp formats")
    .isAlpha()
    .withMessage("fileType can only include png or webp"),
];
