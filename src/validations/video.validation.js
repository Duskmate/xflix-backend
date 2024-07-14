const Joi = require("joi");

const postVideo = {
    body: Joi.object().keys({
        videoLink: Joi.string().required(),
        title: Joi.string().required(),
        genre: Joi.string().required(),
        contentRating: Joi.string().required(),
        releaseDate: Joi.date().required(),
        previewImage: Joi.string().required()
    })
}

const patchVotes = {
    body: Joi.object().keys({
        vote: Joi.string().required(),
        change: Joi.string().required()
    })
}

module.exports = {
    postVideo,
    patchVotes
  };