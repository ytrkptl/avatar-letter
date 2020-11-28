const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: {
        message: errors.array()[0].msg,
      },
    });
  }
  next();
  // don't do next({messageForLog, messageSent}) here
  // as we don't want to log incorrect form inputs
};
