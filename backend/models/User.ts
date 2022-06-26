//* Name of the collection is users !!!

import mongoose, {Schema, Model} from "mongoose";
import {User} from "../Interfaces";

const userSchema = new Schema<User, Model<User>>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  blogs: [{type: mongoose.Types.ObjectId, ref: "Blog", required: true}],
});

export default mongoose.model<User>("User", userSchema);
