import supertest from 'supertest';
import app from "./App"

const videoResponse = [
  {
    _id: { $oid: "60331f421f1d093ab5424475" },
    videoLink: "youtube.com/embed/uQxg2zv_Orc",
    title: "3,000,000 - Q&A",
    genre: "Movies",
    contentRating: "16+",
    releaseDate: "09 Mar 2019",
    previewImage: "https://i.ytimg.com/vi/uQxg2zv_Orc/mqdefault.jpg",
    votes: { upVotes: "0", downVotes: "0" },
    viewCount: "2",
  },
  {
    _id: { $oid: "60331f421f1d093ab5424476" },
    videoLink: "youtube.com/embed/RQdxHi4_Pvc",
    title: "The Universal S",
    genre: "Comedy",
    contentRating: "12+",
    releaseDate: "10 Aug 2019",
    previewImage: "https://i.ytimg.com/vi/RQdxHi4_Pvc/mqdefault.jpg",
    votes: { upVotes: "0", downVotes: "0" },
    viewCount: "5",
  },
];

describe("Videos", () => {
  it("should return videos on GET request", async() => {
    let getVideos = await supertest(app).get('/v1/videos')
    expect(getVideos).toBeTruthy();
    expect(getVideos.body.length).toEqual(30)
  });

  it("GET /v1/videos?genres=Sports - Verify exactly 6 videos are available for Sports genre", async() => {
    let response = await supertest(app).get('/v1/videos')
    expect(response.body.length).toEqual(6)
    expect(response.body[0].genre).toEqual("Sports") //0th Element
  });
})
