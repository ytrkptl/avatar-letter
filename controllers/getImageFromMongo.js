const { AvatarImage } = require("../db");
const { base64ArrayBuffer } = require("../utils/helperFunctions");

exports.getImageFromMongo = async (req, res, next) => {
  try {
    let img = await AvatarImage.find({
      letter: req.params.letter,
      size: req.params.size,
    });
    img = base64ArrayBuffer(img[0].imageBlob.data);
    return res.status(200).json(img);
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
