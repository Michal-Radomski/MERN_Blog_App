import express from "express";

import {getAllUsers, signUp, login} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", getAllUsers, (req, _res) => {
  console.log("req.ip - getAllUsers:", req.ip);
});

userRouter.post("/signup", signUp, (req, _res) => {
  console.log("req.ip - signUp:", req.ip);
});

userRouter.post("/login", login, (req, _res) => {
  console.log("req.ip - login:", req.ip);
});

export default userRouter;
