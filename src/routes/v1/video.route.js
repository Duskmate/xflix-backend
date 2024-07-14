const express = require("express");
const videoController = require("../../controllers/video.controller");
const validate = require("../../middlewares/validate");
const videoValidation = require("../../validations/video.validation")

const router = express.Router();

router.get('/', videoController.getVideo);
router.get('/:id', videoController.getVideoById);

router.post('/', validate(videoValidation.postVideo), videoController.createVideo);

router.patch('/:id/votes', validate(videoValidation.patchVotes), videoController.patchVotes);
router.patch('/:id/views', videoController.patchViews);

module.exports = router;