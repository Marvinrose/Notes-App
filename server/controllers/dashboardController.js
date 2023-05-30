const Note = require("../models/Notes");
const mongoose = require("mongoose");

// GET

// Aboutpage
exports.dashboard = async (req, res) => {
  const locals = {
    title: "NodeJS Notes App",
    description: "NodeJS Notes App",
  };

  res.render("dashboard/index", {
    locals,
    layout: "../views/layouts/dashboard",
  });
};
