import express from "express";

import {getAllUsers, signUp} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", getAllUsers, (req, _res) => {
  console.log("req.ip - getAllUsers:", req.ip);
});

userRouter.post("/signup", signUp, (req, _res) => {
  console.log("req.ip - signUp:", req.ip);
});

export default userRouter;
