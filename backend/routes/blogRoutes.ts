import express from "express";

import {getAllBlogs} from "../controllers/blogController";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs, (req, _res) => {
  console.log("req.ip - getAllUsers:", req.ip);
});

export default blogRouter;
