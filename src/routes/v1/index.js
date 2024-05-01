const express = require("express");
const videoController = require("../../controllers/video.controller")

const router = express.Router();

router.get("/videos", videoController.getVideos)

module.exports = router;