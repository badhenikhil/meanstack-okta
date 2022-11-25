var express = require("express");
var router = express.Router();
const oktaConfig = require("../okta-config");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get(
  "/test",
  oktaConfig.authenticationRequired,
  function (req, res, next) {
    res.status(200).json({ message: "Hello i am backend service!" });
  }
);

module.exports = router;
