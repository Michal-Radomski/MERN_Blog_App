import "dotenv/config";
import express, {Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";

import blogRoutes from "./routes/blogRoutes";
import userRoutes from "./routes/userRoutes";

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI as string;
// console.log({MONGO_URI});

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes); //* http://localhost:5000/api/user
app.use("/api/blog", blogRoutes); //* http://localhost:5000/api/blog

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to the MongoDB");
  })
  .catch((error: string) => {
    console.log({error});
  })
  .finally(() => {
    console.log("First Job Done!");
  });

// app.get("/", (req, res) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1>Hello World!</h1>");
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req: Request, res: Response) => {
    console.log("req.ip:", req.ip);
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = (process.env.PORT || 5000) as number;

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
