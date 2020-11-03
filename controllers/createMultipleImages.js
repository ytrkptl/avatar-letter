const sharp = require("sharp");
const path = require("path");
var fs = require("fs");
const { AvatarImage } = require("../db");

exports.asyncSaveImageToDB = async (req, res, next) => {
  try {
    const inputFolderPath =
      "C:/Users/ytrkp/OneDrive/avatar-letter/edited images/type1";
    const outputFolderPath =
      "C:/Users/ytrkp/OneDrive/avatar-letter/edited images/type1-sharp";
    const alphabetArray = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    // create folders for each letter
    // for (let i = 0; i < alphabetArray.length; i++) {
    //   let dir = `${outputFolderPath}/${alphabetArray[i]}`;
    //   if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir);
    //   }
    // }

    let promiseArr = alphabetArray.map((el) => {
      // return the promise to array
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 24, height: 24 })
        .toBuffer()
        .then(async (data) => {
          await AvatarImage.create({
            letter: el,
            size: "tiny",
            imageBlob: {
              data,
              contentType: "image/png",
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 32, height: 32 })
        .toBuffer()
        .then(async (data) => {
          await AvatarImage.create({
            letter: el,
            size: "small",
            imageBlob: {
              data,
              contentType: "image/png",
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 48, height: 48 })
        .toBuffer()
        .then(async (data) => {
          await AvatarImage.create({
            letter: el,
            size: "med",
            imageBlob: {
              data,
              contentType: "image/png",
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 64, height: 64 })
        .toBuffer()
        .then(async (data) => {
          await AvatarImage.create({
            letter: el,
            size: "big",
            imageBlob: {
              data,
              contentType: "image/png",
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 128, height: 128 })
        .toBuffer()
        .then(async (data) => {
          await AvatarImage.create({
            letter: el,
            size: "large",
            imageBlob: {
              data,
              contentType: "image/png",
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
      sharp(path.join(inputFolderPath, `${el}.png`))
        .toBuffer()
        .then(async (data) => {
          await AvatarImage.create({
            letter: el,
            size: "full",
            imageBlob: {
              data,
              contentType: "image/png",
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // sharp(path.join(inputFolderPath, `${el}.png`))
      //   .resize({ width: 32, height: 32 })
      //   .toFile(path.join(outputFolderPath, `${el}`, `${el}-small.png`));
      // sharp(path.join(inputFolderPath, `${el}.png`))
      //   .resize({ width: 48, height: 48 })
      //   .toFile(path.join(outputFolderPath, `${el}`, `${el}-med.png`));
      // sharp(path.join(inputFolderPath, `${el}.png`))
      //   .resize({ width: 64, height: 64 })
      //   .toFile(path.join(outputFolderPath, `${el}`, `${el}-big.png`));
      // sharp(path.join(inputFolderPath, `${el}.png`))
      //   .resize({ width: 128, height: 128 })
      //   .toFile(path.join(outputFolderPath, `${el}`, `${el}-large.png`));
      // sharp(path.join(inputFolderPath, `${el}.png`)).toFile(
      //   path.join(outputFolderPath, `${el}`, `${el}-full.png`)
      // );
    });

    await Promise.all(promiseArr)
      .then(function (resultsArray) {
        // do something after the loop finishes
        console.log("done");
        res.json("done");
      })
      .catch(function (err) {
        // do something when any of the promises in array are rejected
        console.log(err.message);
      });
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
