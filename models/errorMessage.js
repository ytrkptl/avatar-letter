const mongoose = require("mongoose");

const errorMessageSchema = new mongoose.Schema(
  {
    messageForLog: {
      type: mongoose.Schema.Types.Mixed,
    },
    messageSent: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

const ErrorMessage = mongoose.model("ErrorMessage", errorMessageSchema);

module.exports = ErrorMessage;
