const { handleDataRequestTwo } = require("../db/airtable-helper");

exports.getAvatarLetter = async (req, res, next) => {
  try {
    let filterByFormula = `{letter}="${req.params.letter}"`;
    let avatarLetter = await handleDataRequestTwo(
      "type1",
      filterByFormula,
      next
    );
    switch (req.params.size) {
      case "full":
        return res.status(200).json(avatarLetter.image[0].thumbnails.full.url);
      case "large":
        return res.status(200).json(avatarLetter.image[0].thumbnails.large.url);
      case "small":
        return res.status(200).json(avatarLetter.image[0].thumbnails.small.url);
      case "all":
        return res.status(200).json(avatarLetter.url);
      default:
        return res.status(200).json(avatarLetter.url);
    }
  } catch (error) {
    return next({
      messageForLog:
        `error occurred while running line line 9 in getAvatarLetter ` +
        error.message,
      status: 400,
      message:
        "Oops! Something went wrong. Please try again or reach out for further help.",
    });
  }
};
