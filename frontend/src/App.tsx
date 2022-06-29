import React from "react";
import {Route, Routes} from "react-router-dom";

import "./App.scss";
import AddBlog from "./components/AddBlog";
import Auth from "./components/Auth";
import BlogDetails from "./components/BlogDetails";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import UserBlogs from "./components/UserBlogs";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myBlogs" element={<UserBlogs />} />
          <Route path="/myBlogs/:id" element={<BlogDetails />} />
          <Route path="/blogs/add" element={<AddBlog />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
