const express = require("express");
const router = express.Router();
const { getFileFromDir } = require("../controllers/getFileFromDir");
const { addAnotherImageType } = require("../controllers/addAnotherImageType");
const {
  getFileFromDirValidator,
} = require("../validators/getFileFromDirValidator");
const { runValidation } = require("../validators");

//route for getting image file itself from public folder
router.get(
  "/file/:set/:size/:name/:fileType",
  getFileFromDirValidator,
  runValidation,
  getFileFromDir
);

/*
 route for posting a completely new folder for completely new images
 for example, adding set2 folder to public/letters
 this requires a req.body to contain "inputFolderPath" and "outputFolderName"
 "inputFolderPath" is the path where the images edited by yourself(the initial ones) are saved.
 For example, an inputFolderPath might equal the following: "C:/Users/ytrkp/OneDrive/avatar-letter/edited-images/set1"
 "outputFolderName" is simply the name of the folder inside public/letters where you want to save the images.
 For example, outputFolderName = "set2"
 For example, outputFolderName = "special 3D font"

 made the endpoint really hard to keep others from trying to add to it by guessing it or something
*/
router.post(
  `/avatar-letter-jkKJK89jJk9kjjoaisdjfo898929323jHUKH8u99`,
  addAnotherImageType
);
// TODO: secure the endpoint above

module.exports = router;
