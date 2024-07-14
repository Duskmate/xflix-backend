const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");
const ApiError = require("../utils/ApiError");
const values = require("../utils/values");

const getVideo = catchAsync(async (req, res) => {
  checkParameter(req.query)
  let title = req.query.title || '';
  let genres = req.query.genres || 'All';
  if (genres.indexOf(',') > -1) {
    genres = genres.split(',')
  }
  videoService.verifyGenre(genres)
  let contentRating = req.query.contentRating || '';
  let sortBy = req.query.sortBy || 'releaseDate';
  let video = await videoService.getVideos(title, genres, contentRating, sortBy);
  res.status(httpStatus.OK).send({videos: video});
});

const checkParameter = async(query) => {
  if (query.sortBy === 'releaseDate' || query.sortBy === 'viewCount' || query.sortBy === undefined) {
    if (values.contentRating.includes(query.contentRating) || query.contentRating === undefined) {
    }
    else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Must be one of [Anyone, 7+, 12+, 16+, 18+, All]')
    }
  }
  else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Must be one of [viewCount, releaseDate]')
  }
}

const getVideoById = catchAsync(async (req, res) => {
  let video = await videoService.getVideoById(req.params.id);
  if (video) {
    res.status(httpStatus.OK).send(video);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'No video found with matching id')
  }
});

const createVideo = catchAsync(async (req, res) => {
  let newVideo = await videoService.createNewVideo(req.body);
  res.status(httpStatus.CREATED).send(newVideo);
});

const patchVotes = catchAsync(async (req, res) => {
  await videoService.vote(req.params.id, req.body.vote, req.body.change);
  res.status(httpStatus.NO_CONTENT).send();
});

const patchViews = catchAsync(async (req, res) => {
  await videoService.view(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getVideo,
  getVideoById,
  createVideo,
  patchVotes,
  patchViews,
};