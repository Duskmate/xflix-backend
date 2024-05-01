/** @type {import('jest').Config} */
const config = {
    reporters: [
      'default',
      ['jest-junit', {outputName: 'report.xml'}],
    ],
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  };
  
  module.exports = config;