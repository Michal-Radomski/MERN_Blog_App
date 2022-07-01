import React from "react";
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./App.scss";
import AddBlog from "./components/AddBlog";
import Auth from "./components/Auth";
import BlogDetails from "./components/BlogDetails";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import UserBlogs from "./components/UserBlogs";
import {authActions, Dispatch, State} from "./redux/store";

function App(): JSX.Element {
  const dispatch: Dispatch = useDispatch();

  const isLoggedIn: boolean = useSelector((state: State) => state.isLoggedIn);
  // console.log({isLoggedIn});

  React.useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />
              <Route path="/blogs/add" element={<AddBlog />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
