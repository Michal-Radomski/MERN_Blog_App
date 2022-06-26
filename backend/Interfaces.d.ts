// Types end Interfaces

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  blogs: string[] | string | [] | null;
}

export interface Blog extends mongoose.Document {
  title: string;
  description: string;
  image: string;
  user: User;
}
