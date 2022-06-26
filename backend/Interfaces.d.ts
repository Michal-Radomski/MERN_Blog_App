// Types end Interfaces

interface User {
  name: string;
  email: string;
  password: string;
  blogs: string[] | string | [] | null;
}

interface Blog {
  title: string;
  description: string;
  image: string;
  user: User;
}
