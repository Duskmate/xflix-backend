// const mongoose = require("mongoose");
const app = require("./src/App");
// const config = require("./src/config/config");

// mongoose.connect(config.mongoose.url).then(() => {
    // console.log("Connected to MongoDB");

    // Start the Node Server
    app.listen(8082, () => {
        console.log('App is running on port 8082')
    })
// })