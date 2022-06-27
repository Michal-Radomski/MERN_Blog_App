import React from "react";
import {Route, Routes} from "react-router-dom";

import "./App.scss";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import UserBlogs from "./components/UserBlogs";

function App() {
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
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
