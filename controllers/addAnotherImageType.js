const sharp = require("sharp");
const path = require("path");
var fs = require("fs");
const { genCharArray } = require("../utils/helperFunctions");

exports.addAnotherImageType = async (req, res, next) => {
  try {
    // example inputFolderPath: "C:/Users/ytrkp/OneDrive/avatar-letter/edited-images/set1"
    const { inputFolderPath, outputFolderName } = req.body;

    // example outPutFolderName = "set2" or "special 3D font"
    const outputFolderPath = path.join(
      __dirname,
      "..",
      "public",
      "letters",
      `${outputFolderName}`
    );

    // will create an array of alphabets
    const alphabetArray = genCharArray("a", "z");

    // lets return the image labeled "dot1" in case the name input is undefined
    // alphabetArray.push("dot1");

    // create folders for each letter if it doesn't already exist
    for (let i = 0; i < alphabetArray.length; i++) {
      let dir = `${outputFolderPath}/${alphabetArray[i]}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }

    let promiseArr = alphabetArray.map((el) => {
      // png files
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 24, height: 24 })
        .png({ compressionLevel: 9 })
        .toFile(path.join(outputFolderPath, `${el}`, `${el}-tiny.png`));
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 32, height: 32 })
        .png({ compressionLevel: 9 })
        .toFile(path.join(outputFolderPath, `${el}`, `${el}-small.png`));
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 48, height: 48 })
        .png({ compressionLevel: 9 })
        .toFile(path.join(outputFolderPath, `${el}`, `${el}-med.png`));
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 64, height: 64 })
        .png({ compressionLevel: 9 })
        .toFile(path.join(outputFolderPath, `${el}`, `${el}-big.png`));
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 128, height: 128 })
        .png({ compressionLevel: 9 })
        .toFile(path.join(outputFolderPath, `${el}`, `${el}-large.png`));
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 225, height: 225 })
        .png({ compressionLevel: 9 })
        .toFile(path.join(outputFolderPath, `${el}`, `${el}-full.png`));

      // webp
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 24, height: 24 })
        .webp({ lossless: true })
        .toFile(path.join(outputFolderPath, `${el}`, `${el}-tiny.webp`));
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 32, height: 32 })
        .webp({ lossless: true })
        .toFile(path.join(outputFolderPath, `${el}`, `${el}-small.webp`));
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 48, height: 48 })
        .webp({ lossless: true })
        .toFile(path.join(outputFolderPath, `${el}`, `${el}-med.webp`));
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 64, height: 64 })
        .webp({ lossless: true })
        .toFile(path.join(outputFolderPath, `${el}`, `${el}-big.webp`));
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 128, height: 128 })
        .webp({ lossless: true })
        .toFile(path.join(outputFolderPath, `${el}`, `${el}-large.webp`));
      sharp(path.join(inputFolderPath, `${el}.png`))
        .resize({ width: 225, height: 225 })
        .webp({ lossless: true })
        .toFile(path.join(outputFolderPath, `${el}`, `${el}-full.webp`));
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
        `error occurred while adding images to public/letters ` + error.message,
      status: 400,
      message:
        "Oops! Something went wrong. Please try again or reach out for further help.",
    });
  }
};
