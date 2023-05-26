const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value,
      };
      //   console.log(profile);
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

// Google Login Route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Retrieve User Data
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/dashboard",
  })
);

//   Route if something goes wrong

router.get("/login-failure", (req, res) => {
  res.send("Something went wrong..");
});

// Presist User Data after successful authentication
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Retrieve user data from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = router;

//   profileImage: profile.photo[0].value,
