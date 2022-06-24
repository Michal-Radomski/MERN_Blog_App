import {Response, Request} from "express";

import User from "../models/User";

const getAllUsers = async (req: Request, res: Response) => {
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

export default getAllUsers;
