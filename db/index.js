const Airtable = require("airtable");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

// use Airtable for easier viewing and updating of data
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE
);

// use Mongoose for auth and for storing scores
mongoose.set("debug", true);
mongoose.Promise = Promise;
let connectionString = "";
if (process.env.NODE_ENV === "production") {
  connectionString = process.env.MONGO_DB_URI;
} else if (process.env.NODE_ENV === "development") {
  connectionString = "mongodb://localhost/avatar-letter";
} else if (process.env.NODE_ENV === "test") {
  connectionString = "mongodb://localhost/avatar-letter-test";
}
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "development"
) {
  // connectionString = process.env.MONGO_DB_URI;
  exports.connectMongoDB = async () => {
    try {
      await mongoose.connect(connectionString, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("MongoDB connected");
    } catch (error) {
      console.log(
        "DB CONNECTION ERROR: ",
        `${error.message} from line 44 db/index mongoose`
      );
    }
  };
} else {
  // exports.connectMongoDB = require("../tests/db/mongo-test-setup").setupDB;
}

exports.base = base;
exports.AvatarImage = require("../models/avatarImage");
