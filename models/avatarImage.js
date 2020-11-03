const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const avatarImageSchema = new Schema({
  letter: String,
  size: String,
  imageBlob: { data: Buffer, contentType: String },
});

const AvatarImage = mongoose.model("AvatarImage", avatarImageSchema);

module.exports = AvatarImage;
