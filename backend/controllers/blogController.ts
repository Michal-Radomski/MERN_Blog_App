import {Request, Response} from "express";

import Blog from "../models/Blog";

export const getAllBlogs = async (req: Request, res: Response) => {
  console.log("req.ip: - getAllBlogs", req.ip);
  let blogs;

  try {
    blogs = await Blog.find();
  } catch (error) {
    console.log({error});
    throw new Error();
  } finally {
    console.log("Good Job!");
  }

  if (!blogs) {
    return res.status(404).json({message: "No Blogs Found"});
  }
  return res.status(200).json({blogs: blogs});
};

export const addBlog = async (req: Request, res: Response) => {
  console.log("req.ip: - addBlog", req.ip);

  const {title, description, image, user} = req.body;
  const blog = new Blog({
    title: title,
    description: description,
    image: image,
    user: user,
  });

  try {
    await blog.save();
  } catch (error) {
    console.log({error});
  }
  return res.status(200).json({blog: blog});
};
