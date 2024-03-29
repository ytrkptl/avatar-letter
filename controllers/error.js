const { ErrorMessage } = require("../db");

const errorHandler = async (error, req, res, next) => {
  let doc = {
    messageForLog: error.messageForLog,
    messageSent: error.message,
  };
  try {
    await ErrorMessage.create(doc);
  } catch (error) {
    console.log(
      "Error creating the following document in ErroMessage from line 12: " +
        doc +
        " " +
        error.message
    );
  }

  // for cases when we want to send success message despite of error
  // in backend.
  if (error.status === 200) {
    return res.status(200).json(error.message);
  }
  return res.status(error.status || 500).json({
    error: {
      message: error.message || "Oops! Something went wrong.",
    },
  });
};

module.exports = errorHandler;
