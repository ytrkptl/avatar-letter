const express = require("express");
const { asyncSaveImageToDB } = require("../controllers/createMultipleImages");
const router = express.Router();
const { getAvatarLetter } = require("../controllers/getAvatarLetter");
const { getImageFromMongo } = require("../controllers/getImageFromMongo");

router.get("/", (req, res) => {
  res.status(200).json("it works");
});

router.get("/favicon.ico", (req, res) => res.status(200));

// router.get("/avatar-letter/:size/:letter", getAvatarLetter);

//route for adding images to mongo
router.post("/avatar-letter/:size/:letter", asyncSaveImageToDB);

//route for getting images from mongo
router.get("/avatar-letter/:size/:letter", getImageFromMongo);

module.exports = router;
