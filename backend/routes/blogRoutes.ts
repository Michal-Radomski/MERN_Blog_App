import express from "express";

import {getAllBlogs, addBlog} from "../controllers/blogController";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs, (req, _res) => {
  console.log("req.ip - getAllUsers:", req.ip);
});

blogRouter.post("/add", addBlog, (req, _res) => {
  console.log("req.ip - addBlog:", req.ip);
});

export default blogRouter;
