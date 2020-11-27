const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

// use Mongoose for auth and for storing scores
mongoose.set("debug", true);
mongoose.Promise = Promise;
let connectionString = process.env.MONGO_DB_URI;

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

exports.ErrorMessage = require("../models/errorMessage");
