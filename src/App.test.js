import supertest from 'supertest';
import app from "./App"

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
