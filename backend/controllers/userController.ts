import {Response, Request} from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  console.log("req.ip - userController:", req.ip);
  let users: typeof User[];
  try {
    users = await User.find();
  } catch (error) {
    console.error({error});
  } finally {
    console.log("Good Job! - userController");
  }
  if (!users!) {
    return res.status(404).json({message: "No Users found"});
  }
  return res.status(200).json({users: users});
};

export const signUp = async (req: Request, res: Response) => {
  const {name, email, password} = req.body;
  let existingUser: typeof User | null;
  try {
    existingUser = await User.findOne({email: email});
  } catch (error) {
    console.error({error});
  }
  if (existingUser!) {
    return res.status(400).json({message: "User Already Exists! Login Instead"});
  }
  const salt = bcrypt.genSaltSync(10);
  // console.log({salt});
  const hashedPassword = bcrypt.hashSync(password, salt);
  const user = new User({name: name, email: email, password: hashedPassword, blogs: []});
  try {
    await user.save();
  } catch (error) {
    console.error({error});
  }
  res.status(200).json({message: `User: ${user}`});
};

export const login = async (req: Request, res: Response) => {
  const {email, password}: {email: string; password: string} = req.body;
  let existingUser: typeof User | null;
  try {
    existingUser = await User.findOne({email: email});
  } catch (error) {
    console.error({error});
  }
  if (!existingUser!) {
    return res.status(400).json({message: "Couldn't Find User By This Email! Change Email Or SignUp Instead"});
  }

  // @ts-ignore
  const isPasswordCorrect: boolean = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({message: "Incorrect Password"});
  }
  return res.status(200).json({message: "Login Successful", user: existingUser});
};
