// app: jotter
// made with love by mastarstrange and later ported to bun and fun stuff by thuvasooriya

import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { cors } from "@elysiajs/cors";
//
import { noteRoutes, userRoutes } from "./routes";
import { error, logger } from "./middlewares";
import { connectDB } from "./config";

const app = new Elysia();

connectDB();

app.use(cors());
app.use(
  swagger({
    path: "/api/v1/docs",
    documentation: {
      info: {
        title: "jotter",
        version: "1.2.8",
      },
    },
  })
);
app.use(noteRoutes);
app.use(userRoutes);

app.use(logger()).use(error());
app
  .use(staticPlugin())
  .use(html())
  .get("/", () => Bun.file("public/index.html").text());

// start the server
app.listen(Bun.env.PORT || 9000);

console.log(
  `🚀 server is running at ${app.server?.hostname}:${app.server?.port}`
);
