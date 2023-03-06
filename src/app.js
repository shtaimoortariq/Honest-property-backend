const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(
	session({
		secret: "SECRET",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

require("./routes")(app); // Set Application routes and their handlers

if (process.env.NODE_ENV === "development") {
	// only use in development
	app.use(require("errorhandler")());
}

module.exports = app;
