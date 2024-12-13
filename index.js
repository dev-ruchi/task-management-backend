import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Failed to connect to DB:", err));

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

import tasksRouter from "./routes/tasks.js"

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/tasks", tasksRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});