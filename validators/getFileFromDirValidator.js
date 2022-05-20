const { check } = require("express-validator");

const checkAlphaNumeric = (name) => {
  const regex = new RegExp(/^[a-z0-9]+$/i);
  return regex.test(name);
};

const checkAlphaNumericOrWithAtSymbol = (name) => {
  const regex = new RegExp(/^[a-z0-9@]+$/i);
  return regex.test(name);
};

const checkAlpha = (name) => {
  const regex = new RegExp(/^[a-z]+$/i);
  return regex.test(name);
};

const checkNumeric = (name) => {
  const regex = new RegExp(/^[0-9]+$/i);
  return regex.test(name);
};

// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const validateEmail = (email) => {
  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return regex.test(email);
};

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
    .custom((value, { req }) => {
      let check1 = checkAlphaNumeric(value);
      let check2 = checkAlphaNumericOrWithAtSymbol(value);
      let check3 = checkAlpha(value);
      let check4 = checkNumeric(value);
      let check5 = validateEmail(value);
      const checkArray = [check1, check2, check3, check4, check5];
      return checkArray.includes(true);
    }),
  check("fileType")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("format is required and can only include png or webp formats")
    .isAlpha()
    .withMessage("fileType can only include png or webp"),
];
