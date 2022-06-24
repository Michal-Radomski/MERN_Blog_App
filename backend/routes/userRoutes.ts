import express from "express";

import getAllUsers from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", getAllUsers, (req, _res) => {
  console.log("req.ip - userRoutes:", req.ip);
});

export default userRouter;
