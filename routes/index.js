const express = require("express");
const router = express.Router();
const { getFileFromDir } = require("../controllers/getFileFromDir");

router.get("/", (req, res) => {
  res.status(200).json("it works");
});

router.get("/favicon.ico", (req, res) => res.status(200));

//route for getting image file itself from public folder
router.get("/avatar-letter/file/:size/:letter/:fileType", getFileFromDir);

module.exports = router;
