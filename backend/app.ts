import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI as string;
// console.log({MONGO_URI});
const app = express();

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to the MongoDB");
  })
  .catch((error: string) => {
    console.log({error});
  });

app.use("/", (req, res) => {
  console.log("req.ip:", req.ip);
  res.send("<h1>Hello World!</h1>");
});

const port = (process.env.PORT || 3000) as number;

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  console.log("Current Time:", new Date().toLocaleTimeString());
});
