const Note = require("../models/Notes");
const mongoose = require("mongoose");

// GET

// Aboutpage
exports.dashboard = async (req, res) => {
  const locals = {
    title: "NodeJS Notes App",
    description: "NodeJS Notes App",
  };

  try {
    const notes = await Note.find({});
    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
    });
    console.log(notes);
  } catch (error) {}
};
