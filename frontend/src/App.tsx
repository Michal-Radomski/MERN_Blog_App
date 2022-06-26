import React from "react";

import "./App.scss";
import AddBlog from "./components/AddBlog";
import BlogDetails from "./components/BlogDetails";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import Login from "./components/Login";
import UserBlogs from "./components/UserBlogs";

function App() {
  return (
    <React.Fragment>
      App
      <AddBlog />
      <Blogs />
      <BlogDetails />
      <Header />
      <Login />
      <UserBlogs />
    </React.Fragment>
  );
}

export default App;
