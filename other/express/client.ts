import express from "express";

const app = express();

app.set("port", 3001);

app.use(express.static("public"));

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);