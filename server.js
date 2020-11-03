const express = require("express");
const cors = require("cors");
const errorHandler = require("./controllers/error");
const routes = require("./routes/index");
const { connectMongoDB } = require("./db");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();

//middlewares
//need to do this limit stuff to avoid request entity too large error
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

let corsOptions;
if (process.env.NODE_ENV !== "production") {
  corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
} else {
  corsOptions = {
    origin: "https://yatrik-math-app.herokuapp.com", //doesn't exist yet. this is just a dummy one.
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
}
app.use(cors(corsOptions));

// connect to db
if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "production"
) {
  connectMongoDB();
} else {
  // connectMongoDB("avatar-letter-test");
}

//routes
app.use("/api", routes);

// error Handler middlerware. Must keep it down here at the very end
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;
