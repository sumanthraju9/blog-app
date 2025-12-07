import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import SingleBlog from "./pages/SingleBlog";
import SignUp from "./pages/SignUp";
import Login from "./pages/Loign";
import UploadBlog from "./pages/UploadBlog";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/blog/:blogId"
            element={
              <ProtectedRoute>
                <SingleBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/uploadBlog"
            element={
              <ProtectedRoute>
                <UploadBlog />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
