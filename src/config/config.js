let dotenv = require('dotenv').config()

module.exports = {
  port: process.env.PORT,
  // Set mongoose configuration
  mongoose: {
    url: process.env.MONGODB_URL
  },
};