// app: jotter
// made with love by mastarstrange and later ported to bun and fun stuff by thuvasooriya

import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
//
import { userRoutes } from "./routes";
import { error, logger } from "./middlewares";
import { connectDB } from "./config";

// Create Elysia instance
const app = new Elysia();

// Config MongoDB
connectDB();

app.use(
  swagger({
    path: "/v1/swagger", // endpoint which swagger will appear on
    documentation: {
      info: {
        title: "jotter",
        version: "1.0.0",
      },
    },
  })
);

// Middlewares
app.use(logger());
app.use(error());

// Root Routes
app
  .use(staticPlugin())
  .use(html())
  .get("/", () => Bun.file("public/index.html").text());

// User Routes [api/v1/users]
app.use(userRoutes);

// Start the server
app.listen(Bun.env.PORT || 9000);

console.log(
  `🚀 server is running at ${app.server?.hostname}:${app.server?.port}`
);

// var express = require("express"); // Requiring express package

// const mongoose = require("mongoose"); // Requiring mongoose package

// const db = require("../config/db"); // Keeping database links seperately in config folder

// const app = express(); // Declaring and assigning an express object

// var path = require("path"); //? For altering static path

// //? The linking of scripts won't work without this due to some static error
// app.use(express.static(path.join(__dirname, "src")));

// app.use(express.static("public"));

// app.use(express.static(__dirname)); // This command fetches the index.html in the specified path

// // Connecting to mongodb with mongoose
// mongoose.connect(db.url, { useUnifiedTopology: true, useNewUrlParser: true });
// //! Need more info on this
// mongoose.Promise = global.Promise;
// const con = mongoose.connection;

// app.use(express.json()); // Body Parser renewed

// // Console help for confirming mongoose connection
// try {
//   con.on("open", () => {
//     console.log("mongoose is connected");
//   });
// } catch (error) {
//   console.log("Error: " + error);
// }
// // con.once('open', () => console.log('Mongoose is connected')) // Alternative code

// // One stupid line to waste a whole day on
// // Here /jd is the base url for the routes from the required file
// app.use("/jd", require("./routes/note.routes"));

// // error handling middleware
// //! Need more info
// // app.use((err, req, res, next) => {
// //   console.log(err)
// //   res.status(422).send({ error: err.message })
// // })

// // Port Listening
// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
// app.listen(port, () => console.log("strange listening on " + port));
