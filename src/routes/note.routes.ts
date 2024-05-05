import { Elysia, t } from "elysia";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers";

const noteRoutes = (app: Elysia) => {
  app
    .group("/api/v1/notes", (app) =>
      app
        .post("/", createNote, {
          body: t.Object({
            title: t.String(),
            text: t.String(),
            // tags: t.Array(t.String()), // Add the missing argument to the t.Array function call
          }),
          type: "json",
        })

        .get("/", getNotes, {})
    )
    .group("/api/v1/note", (app) =>
      app
        .put("/:id", updateNote, {})

        .delete("/:id", deleteNote, {})
    );
};

export default noteRoutes as any;
