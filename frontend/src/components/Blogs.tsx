import React from "react";
import axios from "axios";

import Blog from "./Blog";

const Blogs = (): JSX.Element => {
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  // console.log({blogs});

  const sendRequest = async () => {
    const response = await axios.get("http://localhost:5000/api/blog").catch((error) => console.log({error}));
    const data = await response?.data;
    return data;
  };

  React.useEffect(() => {
    // sendRequest().then((response) => console.log({response}));
    sendRequest().then((response) => setBlogs(response.blogs));
  }, []);

  return (
    <div>
      {/* <Blog /> */}
      {blogs &&
        blogs.map((blog: Blog, index: number) => (
          <Blog
            id={blog._id!}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            key={index}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={blog?.user?.name ?? "Undefined"}
          />
        ))}
    </div>
  );
};

export default Blogs;
