const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./controllers/error");
const routes = require("./routes/index");
const { connectMongoDB } = require("./db");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// added to protect against XSS and such
// Source: https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet());

app.use(
  cors({
    origin: "*", //doesn't exist yet. this is just a dummy one.
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// connect to db
connectMongoDB();

//routes
app.use("/api", routes);

// error Handler middlerware. Must keep it down here at the very end
app.use((req, res, next) => {
  let err = new Error(req.url + " Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;
