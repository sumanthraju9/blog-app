import React from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div className="navbar flex items-center justify-between h-[100px] px-[100px] bg-[#0c0c0c] overflow-hidden">
        <div className="logo">
          <img className="w-[240px]" src={logo} alt="" />
        </div>
        <div className="links flex items-center gap-[20px]">
          <Link to="/" className="navLink active">
            Home
          </Link>
          <Link to="/uploadBlog" className="navLink">Upload Blog</Link>
          <Link className="navLink">Blogs</Link>
          <Link className="navLink">Services</Link>
          <Link className="navLink">Contact</Link>
          

          <button
            onClick={handleLogout}
            className="btnNormal !bg-red-500 transition-all hover:!bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
