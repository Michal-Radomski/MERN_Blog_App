//* Name of the collection is blogs !!!

import mongoose, {Schema, Model} from "mongoose";
import {Blog} from "../Interfaces";

const blogSchema = new Schema<Blog, Model<Blog>>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    // type: String,
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model<Blog>("Blog", blogSchema);
