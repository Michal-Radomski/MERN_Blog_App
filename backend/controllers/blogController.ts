import {Request, Response} from "express";

import Blog from "../models/Blog";

export const getAllBlogs = async (req: Request, res: Response) => {
  console.log("req.ip: - getAllBlogs", req.ip);
  let blogs;

  try {
    blogs = await Blog.find();
  } catch (error) {
    console.log({error});
  } finally {
    console.log("Good Job!");
  }

  if (!blogs) {
    return res.status(404).json({message: "No Blogs Found"});
  }
  return res.status(200).json({blogs: blogs});
};
