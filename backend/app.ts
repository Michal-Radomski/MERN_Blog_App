import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes";

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI as string;
// console.log({MONGO_URI});
const app = express();
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to the MongoDB");
  })
  .catch((error: string) => {
    console.log({error});
  });

app.get("/", (req, res) => {
  console.log("req.ip:", req.ip);
  res.send("<h1>Hello World!</h1>");
});

const port = (process.env.PORT || 3000) as number;

app.use("/api/user", userRoutes); //* http://localhost:3000/api/user

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  console.log("Current Time:", new Date().toLocaleTimeString());
});
