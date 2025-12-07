import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const { signup, loading, error, clearError } = useAuthStore();

  const submitForm = async (e) => {
    e.preventDefault();
    clearError();
    const result = await signup({
      username,
      name,
      email,
      password: pwd,
    });

    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="con flex flex-col items-center justify-center h-screen bg-[#070707]">
        <form
          onSubmit={submitForm}
          className="w-[26vw] min-h-[auto] bg-[#0f0e0e] rounded-2xl px-[30px] py-[30px]"
        >
          <div className="flex flex-col items-center justify-center w-full">
            <img src={logo} alt="Logo" className="w-[180px] mb-4" />
            <h3 className="text-2xl font-semibold mb-1">Create account</h3>
            <p className="text-[14px] text-[gray] mb-4">
              Sign up to start creating and reading blogs.
            </p>
          </div>

          <div className="w-full">
            <p className="text-[gray] text-[14px] mt-3">Username</p>
            <div className="inputBox">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Username"
                required
              />
            </div>

            <p className="text-[gray] text-[14px] mt-3">Name</p>
            <div className="inputBox">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <p className="text-[gray] text-[14px] mt-3">Email</p>
            <div className="inputBox">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <p className="text-[gray] text-[14px] mt-3">Password</p>
            <div className="inputBox">
              <input
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <p className="text-[14px] text-[gray] mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600">
                Login
              </Link>
            </p>

            {error && (
              <p className="text-[14px] text-red-500 mt-1 mb-3">{error}</p>
            )}

            <button
              type="submit"
              className="btnNormal w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
