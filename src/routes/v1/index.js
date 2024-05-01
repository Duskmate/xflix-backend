const express = require("express");

const router = express.Router();

router.get("/videos", function (req, res, next) {
  res.send("data");
})

module.exports = router;
