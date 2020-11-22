const express = require("express");
const router = express.Router();
const { getFileFromDir } = require("../controllers/getFileFromDir");
const { addAnotherImageType } = require("../controllers/addAnotherImageType");

router.get("/", (req, res) => {
  res.status(200).json("it works");
});

router.get("/favicon.ico", (req, res) => res.status(200));

//route for getting image file itself from public folder
router.get("/avatar-letter/file/:size/:letter/:fileType", getFileFromDir);

/**
 * route for posting a completely new folder for completely new images
 * for example, adding type2 folder to public/letters
 *
 * @param inputFolderPath is the path where the images edited by yourself(the initial ones) are saved.
 * For example, an inputFolderPath might equal the following: "C:/Users/ytrkp/OneDrive/avatar-letter/edited images/type1"
 * @param outputFolderName is simply the name of the folder inside public/letters where you want to save the images.
 * For example, outputFolderName = "type2"
 * For example, outputFolderName = "special 3D font"
 */
//
router.post(
  "/avatar-letter/:inputFolderPath/:outputFolderName",
  addAnotherImageType
);

// router.post(
//   "/avatar-letter/:inputFolderPath/:outputFolderName/:size/:letter/:fileType",
//   addAnotherImageType
// );

module.exports = router;
