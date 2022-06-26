import {Request, Response} from "express";
import mongoose from "mongoose";

import Blog from "../models/Blog";
import User from "../models/User";

export const getAllBlogs = async (req: Request, res: Response) => {
  console.log("req.ip: - getAllBlogs", req.ip);
  let blogs: typeof Blog[];
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
  let existingUser: typeof User | null;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log({error});
  }

  if (!existingUser) {
    return res.status(400).json({message: "Unable To Find User By This ID"});
  }
  const blog = new Blog({
    title: title,
    description: description,
    image: image,
    user: user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});

    // @ts-ignore
    existingUser.blogs?.push(blog);
    // @ts-ignore
    await existingUser.save({session});
    await session.commitTransaction();
  } catch (error) {
    console.log({error});
    return res.status(500).json({message: error});
  }
  return res.status(200).json({blog: blog});
};

export const updateBlog = async (req: Request, res: Response) => {
  console.log("req.ip: - updateBlog", req.ip);
  const {title, description, image} = req.body;
  // console.log({title}, {description}, {image});
  const blogId = req.params.id;
  console.log({blogId});
  let blog: typeof Blog | null;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title: title,
      description: description,
      image: image,
    });
    // console.log({blog});
  } catch (error) {
    return console.log({error});
  }
  if (!blog) {
    return res.status(500).json({message: "Unable To Update The Blog"});
  }
  return res.status(200).json({blog: blog});
};

export const getBlogById = async (req: Request, res: Response) => {
  console.log("req.ip - getBlogById:", req.ip);
  const blogId = req.params.id;
  console.log({blogId});
  let blog: typeof Blog | null;
  try {
    blog = await Blog.findById(blogId);
  } catch (error) {
    console.log({error});
  }
  if (!blog!) {
    return res.status(404).json({message: "No Blog Found"});
  }
  return res.status(200).json({blog: blog});
};

export const deleteBlogById = async (req: Request, res: Response) => {
  console.log("req.ip - deleteBlogById:", req.ip);
  const blogId = req.params.id;
  console.log({blogId});
  let blog: typeof Blog | null;
  try {
    blog = await Blog.findByIdAndRemove(blogId);
  } catch (error) {
    console.log({error});
  }
  if (!blog!) {
    return res.status(404).json({message: "Unable To Delete"});
  }
  return res.status(200).json(`Blog: ${blog} Successfully Deleted`);
};
