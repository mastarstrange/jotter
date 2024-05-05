console.log("evaluating note.routes"); // Confirming the routes JS is evaluated
// const nModel = require('../models/note') // Importing Note schema module
import { Elysia, t } from "elysia";
import {
  createUser,
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  loginUser,
  updateUser,
} from "../controllers";
import { admin, auth } from "../middlewares";

const userRoutes = (app: Elysia) => {
  app.group("/api/v1/notes", (app) =>
    // Create a new user
    app
      .post("/", createUser, {
        body: t.Object({
          name: t.String(),
          email: t.String(),
          password: t.String(),
          isAdmin: t.Optional(t.Boolean()),
        }),
        type: "json",
      })

      // Login a user
      // .post('/login', loginUser, {
      //   body: t.Object({
      //     email: t.String(),
      //     password: t.String(),
      //   }),
      //   type: 'json',
      // })

      // Get all users
      .get("/", getUsers, {
        beforeHandle: (c) => admin(c),
      })

      // Get a single user
      .get("/:id", getUser, {
        beforeHandle: (c) => auth(c),
      })

      // Get user profile
      .get("/profile", getUserProfile, {
        beforeHandle: (c) => auth(c),
      })

      // Update a single user
      .put("/:id", updateUser, {
        beforeHandle: (c) => admin(c),
      })

      // Delete a single user
      .delete("/:id", deleteUser, {
        beforeHandle: (c) => admin(c),
      })
  );
};

export default userRoutes as any;

// //# Create operation routing (post)
// note.post("/notes", (req, res, next) => {
//   console.log("evaluating create operation");
//   nModel
//     .create(req.body)
//     .then((note) => res.send("Note created Successfully!\n" + note.title))
//     .catch(next);
// });

// //# Read operation routing (get)
// note.get("/notes", (req, res, next) => {
//   console.log("evaluating read operation");
//   nModel
//     .find({}) // No Query for filtering
//     .then((notes) => res.send(notes))
//     .catch(next);
// });

// //# Update operation routing (put)
// note.put("/note/:id", function (req, res, next) {
//   let uID = req.params.id;
//   console.log("evaluating update operation");
//   nModel
//     .findOneAndUpdate({ _id: uID }, req.body)
//     .then(() => {
//       nModel
//         .findOne({ _id: uID })
//         .then((note) => res.send("smmuccesfully updated " + note.title));
//     })
//     .catch(next);
// });

// //# Delete operation routing (delete)
// note.delete("/note/:id", (req, res) => {
//   var dID = req.params.id; // Extracting id from requested parametes
//   console.log("evaluating delete operation");
//   nModel
//     .findOneAndDelete({ _id: dID })
//     .then((note) =>
//       res.send("note with title: " + note.title + ", is deleted")
//     );
// });
