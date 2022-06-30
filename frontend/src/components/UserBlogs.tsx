import React from "react";
import axios from "axios";

import Blog from "./Blog";

interface User extends Person {
  blogs: Blog[];
}

const UserBlogs = (): JSX.Element => {
  const userId: string | null = localStorage.getItem("userId");

  // const [myBlogs, setMyBlogs] = React.useState<Blog[]>([]);
  // const [myName, setMyName] = React.useState<string>("");
  // console.log({myBlogs});
  // console.log({myName});
  const [user, setUser] = React.useState<User>();
  // console.log({user});

  React.useEffect(() => {
    const sendRequest = async () => {
      const response = await axios.get(`http://localhost:5000/api/blog/user/${userId}`).catch((error) => {
        console.error({error});
      });
      const data = await response?.data;
      return data;
    };
    sendRequest().then((response) => {
      // setMyBlogs(response.blogs.blogs);
      // setMyName(response.blogs.name);
      setUser(response.user);
    });
  }, [userId]);

  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog: Blog, index: number) => (
          <Blog
            key={index}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={user.name ?? "Undefined"}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
