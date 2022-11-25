var express = require("express");
var router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", function (req, res) {
  try {
    const { email, password } = req.body;

    User.findOne({ email })
      .exec()
      .then((foundUser) => {
        if (!foundUser) {
          const user = new User({
            email,
            password: User.hashPassword(password),
          });

          const userDoc = user.save().then((userDoc) => {
            res.status(201).json(userDoc);
          });
        } else res.status(501).json({ message: "already registered!" });
      });
  } catch (ex) {
    console.log(ex);
    res.status(501).json({ message: ex });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .exec()
    .then((doc) => {
      if (doc.isValid(req.body.password)) {
        //generate token
        const token = jwt.sign({ username: email }, "secret", {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "login success", token });
      } else res.status(501).json({ message: "invalid password" });
    })
    .catch(() => {
      res.status(501).json({ message: "user not registered" });
    });
});

router.get("/users", isAuthenticated, (req, res) => {
  res.status(200).json(tokenData);
});
router.get("/logout", isAuthenticated, (req, res) => {
  req.logout();
  res.status(200).json({ message: "logout success" });
});

let tokenData;
function isAuthenticated(req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) throw "error";
    else {
      const bearer = bearerHeader.split(" ");
      if (bearer.length == 2) {
        const token = bearer[1];
        jwt.verify(req.query.token, "secret", (err, _tokenData) => {
          if (err) throw err;
          else {
            tokenData = _tokenData;
            next();
          }
        });
      }
    }
  } catch (e) {
    res.status(401).json({ message: "token invalid" });
  }
}

module.exports = router;
