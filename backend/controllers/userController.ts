import {Response, Request} from "express";

import User from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  console.log("req.ip - userController:", req.ip);
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.error({error});
  }
  if (!users) {
    return res.status(404).json({message: "No Users found"});
  }
  return res.status(200).json({users: users});
};

export const signUp = async (req: Request, res: Response) => {
  const {name, email, password} = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({email: email});
  } catch (error) {
    console.error({error});
  }
  if (existingUser) {
    return res.status(400).json({message: "User Already Exists! Login Instead"});
  }

  const user = new User({name: name, email: email, password: password});

  try {
    user.save();
  } catch (error) {
    console.error({error});
  }
  res.status(200).json({message: `User: ${user}`});
};
