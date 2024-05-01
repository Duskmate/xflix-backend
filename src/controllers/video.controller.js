const { Video } = require("../models")

const getVideos = async(req, res) => {
    let videos = await Video.find({})
    res.send(videos)
}

module.exports = {getVideos};