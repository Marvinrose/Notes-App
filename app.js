require("dotenv").config();

const express = require("express");

const expressLayouts = require("express-ejs-layouts");

const app = express();

const port = 8080 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// static files
app.use(express.static("public"));

// templating engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
app.use("/", require("./server/routes/index"));

app.listen(port, () => {
  console.log(`Notes app listening on port ${port}`);
});
