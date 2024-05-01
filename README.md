
# Video Filter API

## Data:

Example of a video JSON object:

```json
{
	"id": "60211cb602edbc33d4214360",
	"videoLink": "youtube.com/embed/vxxN3_bs6Uo",
	"title": "Crio Fireside chat with Binny Bansal",
	"genre": "Education",
	"contentRating": "7+",
	"releaseDate": "12 Jan 2021",
"previewImage":"https://i.ytimg.com/vi/vxxN3_bs6Uo/maxresdefault.jpg",
	"votes": {
		"upVotes": "0",
		"downVotes": "0"
	},
	"viewCount": "0"
}
```

## Project Specifications:

The model implementation is provided and read-only and the seed data is loaded into the database as soon as the app initializes.

Your task is to implement the REST service that exposes the /v1/videos endpoint, which allows for filtering the collection of students in the following way:

- GET request to `/students?genre=Sports`:
  - returns the list of all the students present in the videos collection
  - the response code is 200, and the response body returns the list of all the students present
  - optionally accepts the query param `genre` for filtering videos
  - `genre` query param is used to filter the genre property of a video to return videos belonging to particular genre

NOTE:

You should complete the given project so that it passes all the test cases when running the provided unit tests. The project by default supports the use of the mongoDB database.

**Read Only Files**

- `test/*.spec.js`
- `fixtures/*.json`
- `models/students.js`

## Environment

- Node Version: v14(LTS)
- Default Port: 8082

**Commands**

- run:

```bash
npm start
```

- install:

```bash
npm install
```

- test:

```bash
npm test
```
