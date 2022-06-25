import express from "express";

import {getAllBlogs, addBlog, updateBlog} from "../controllers/blogController";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs, (req, _res) => {
  console.log("req.ip - getAllUsers:", req.ip);
});

blogRouter.post("/add", addBlog, (req, _res) => {
  console.log("req.ip - addBlog:", req.ip);
});

blogRouter.put("/update:id", updateBlog, (req, _res) => {
  console.log("req.ip - updateBlog:", req.ip);
  console.log("req.params.id: ", req.params["id"]);
});

export default blogRouter;
