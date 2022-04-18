var createError = require("http-errors");
const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

// const { MongoClient } = require("mongodb");
require("dotenv").config();

var usersRouter = require("./routes/users");
var todoRouter = require("./routes/todos");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: "https://storied-granita-8d6b65.netlify.app", //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200, //レスポンスstatusを200に設定
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/todos", todoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// CORs対応
// const allowCrossDomain = function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, access_token"
//   );

//   // intercept OPTIONS method
//   if ("OPTIONS" === req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// };
// app.use(allowCrossDomain);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Develop
const uri = `mongodb+srv://tatsuki0091:${process.env.NODE_DB_PASSWORD}@cluster0.kzqlf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(uri, options);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "DB connection error:"));
db.once("open", () => console.log("DB connection successful"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
module.exports = app;
