const { Video } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const values = require("../utils/values");

const getVideos = async(title, genres, contentRating, sortBy) => {
  const titleMatch = {title: {$regex: title, $options: 'i'}};
  let genresMatch = {genre: {$in: genres}};
  if (genres.includes('All')) {
    genresMatch = '';
  };
  let ratings = possibleContentRating(contentRating);
  let ratingsMatch = {contentRating: {$in: ratings}};
  if (!contentRating) {
    ratingsMatch = '';
  }
  let videos = await Video.find({...titleMatch, ...genresMatch, ...ratingsMatch})
  sortVideos(videos, sortBy)
  return videos
}

const getVideoById = async (id) => {
  try {
    const videoObj = await Video.findById(id);
    return videoObj;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, '""videoId"" must be a valid mongo id');
  }
};

const possibleContentRating = (contentRating) => {
  if (contentRating === 'Anyone') {
    return contentRating
  }
  let contentRatings = values.contentRating
  return contentRatings.splice(0, contentRatings.indexOf(contentRating)+1)
}

const sortVideos = (videos, sortBy) => {
  if (sortBy === 'viewCount') {
    videos.sort((a, b) => b.viewCount - a.viewCount)
  } else {
    videos.sort((a, b) => b.releaseDate - a.releaseDate)
  }
}

const verifyGenre = (genre) => {
  if (typeof(genre) != 'string') {
    for (let i=0; i<genre.length; i++) {
      if (!values.genre.includes(genre[i])) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]')
      }
    }
  } else {
    if (!values.genre.includes(genre)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]')
    }
  }
}

const createNewVideo = async (video) => {
  try {
    let newVideo = await Video.create({...video})
    return newVideo
  } catch (error) {
    console.log(error)
  }
}

const vote = async(id, vote, change) => {
  let video = await getVideoById(id);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No video found with matching id');
  }
  if (change === 'increase') {
    if (vote === 'upVote') {
      video.votes = {
        'upVotes': video.votes.upVotes +1,
        'downVotes': video.votes.downVotes
      }
    } else {
      video.votes = {
        'upVotes': video.votes.upVotes,
        'downVotes': video.votes.downVotes +1
      }
    }
  } else {
    if (vote === 'upVote') {
      video.votes = {
        'upVotes': video.votes.upVotes -1,
        'downVotes': video.votes.downVotes
      }
    } else {
      video.votes = {
        'upVotes': video.votes.upVotes,
        'downVotes': video.votes.downVotes -1
      }
    }
  }
  await video.save();
  return video
}

const view = async(id) => {
  let video = await getVideoById(id);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No video found with matching id');
  }
  video.viewCount++;
  video.save();
  return video
}

module.exports = {
    getVideos,
    getVideoById,
    possibleContentRating,
    verifyGenre,
    createNewVideo,
    vote,
    view
};