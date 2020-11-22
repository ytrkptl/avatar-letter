const path = require("path");

exports.getFileFromDir = async (req, res, next) => {
  try {
    const img = path.join(__dirname, "..", "public", "letters", "type1");
    return res.sendFile(
      `${img}/${req.params.letter}/${req.params.letter}-${req.params.size}.${req.params.fileType}`
    );
  } catch (error) {
    return next({
      messageForLog:
        `error occurred while running line line 16 in createMultipleImages ` +
        error.message,
      status: 400,
      message:
        "Oops! Something went wrong. Please try again or reach out for further help.",
    });
  }
};
