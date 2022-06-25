import express from "express";

import {getAllBlogs, addBlog, updateBlog, getBlogById} from "../controllers/blogController";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs, (req, _res) => {
  console.log("req.ip - getAllUsers:", req.ip);
});

blogRouter.post("/add", addBlog, (req, _res) => {
  console.log("req.ip - addBlog:", req.ip);
});

blogRouter.put("/update/:id", updateBlog, (req, _res) => {
  console.log("req.ip - updateBlog:", req.ip);
});

blogRouter.get("/:id", getBlogById, (req, _res) => {
  console.log("req.ip - getBlogById:", req.ip);
});

export default blogRouter;
