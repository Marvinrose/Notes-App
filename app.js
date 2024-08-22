require("dotenv").config();

const express = require("express");

const connectDB = require("./server/config/db");

const expressLayouts = require("express-ejs-layouts");

const session = require("express-session");

const passport = require("passport");

const MongoStore = require("connect-mongo");

const app = express();

const port = 8080 || process.env.PORT;

const methodOverride = require("method-override");


app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    // cookie: { maxAge: new Date ( Date.now() + (3600000) ) },
    // Date.now() - 30 * 24 * 60 * 60 * 1000
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

// connect to Database
connectDB();

app.use(express.json());

// static files
app.use(express.static("public"));

// Use method override with query string, e.g., ?_method=PUT
app.use(methodOverride("_method"));

// templating engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
app.use("/", require("./server/routes/index"));
app.use("/", require("./server/routes/auth"));
app.use("/", require("./server/routes/dashboard"));

// Handle 404
app.get("*", function (req, res) {
  //res.status(404).send('404 Page Not Found.')
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Notes app listening on port ${port}`);
});
