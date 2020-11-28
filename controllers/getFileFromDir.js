const path = require("path");

exports.getFileFromDir = async (req, res, next) => {
  try {
    let { set, size, name, fileType } = req.params;
    // find the first alphabet in the name provided
    // if undefined, return the image labeled dot1
    name = name.toLowerCase();
    name = (name.match(/[a-zA-Z]/) || ["dot1"]).pop();
    // if no set is provided return from set1
    if (set === undefined) {
      set = "set1";
    }
    // path for finding the image files in the public/letters folder
    const img = path.join(__dirname, "..", "public", "letters");
    // return the image file
    return res.sendFile(`${img}/${set}/${name}/${name}-${size}.${fileType}`);
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
