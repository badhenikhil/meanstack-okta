var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();
mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
  console.log(`conencted to ${process.env.MONGO_CONNECTION_STRING}`);
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  cors({
    origin: ["http://localhost:4200"],
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(
//   require("express-session")({
//     name: "my_session",
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 36000000,
//       httpOnly: false,
//       secure: false,
//     },
//   })
// );
//require("./passport-config");
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/", indexRouter);
//app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
