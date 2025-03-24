import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import logo from "../assets/images/logo.jpeg";
import { login } from "./helper/apiCalls";
import { lsService } from "../services/ls.service";

function SignIn() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill all the fields");
      return;
    }

    const response = await login({ username, password });

    if(response.status === 200) {
      alert("Login successfull")
      setUsername("");
      setPassword("");
      lsService.set("token", response.data.token);
      lsService.set("user", response.data.user);
      navigate("/home")
    } else {
      alert("Error registering user")
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col pt-16  min-h-screen bg-[rgba(0,0,0,0.75)]">
        <div
          className="bg-zinc-800 p-6 mt-6 rounded-md relative z-20 w-[90%] sm:w-[70%] md:w-[34rem] max-w-md mx-auto"
          style={{
            boxShadow:
              "0px 10px 30px rgba(0, 0, 0, 0.7), " + // Darker bottom-right shadow for raised effect
              "0px -10px 30px rgba(255, 255, 255, 0.2), " + // Lighter top-left for raised effect
              "10px 0px 30px rgba(0, 0, 0, 0.3), " + // Darker left shadow for depth (similar to bottom-right)
              "0px 10px 30px rgba(0, 0, 0, 0.3), " + // Slight shadow on right/bottom
              "0px -10px 30px rgba(255, 255, 255, 0.2), " + // Slight light effect on top/left
              "-10px 0px 30px rgba(255, 255, 255, 0.2), " + // Lighter left side glow
              "10px 0px 30px rgba(0, 0, 0, 0.7)", // Darker right shadow (similar to bottom)
          }}
        >
          <div className="logo-section rounded-3xl flex justify-center mb-6">
            <div className="flex-shrink-0 pt-4">
              <img src={logo} alt="logo" className="h-12" />
            </div>
          </div>

          <br />
          <h2 className="text-2xl font-strong mb-2 mt-0 text-center text-white">
            Sign In
          </h2>
          <p className="flex justify-center text-white">
            Enter your Login ID and password to access your account.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 pt-6">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                style={{
                  boxShadow:
                    "inset 0px 4px 8px rgba(0, 0, 0, 0.6), " + // Darker shadow on top (pressed effect)
                    "inset 0px -4px 8px rgba(255, 255, 255, 0.2), " + // Lighter bottom shadow (soft glow)
                    "inset 4px 0px 8px rgba(0, 0, 0, 0.6), " + // Darker shadow on the left (pressed effect)
                    "inset -4px 0px 8px rgba(255, 255, 255, 0.2)", // Lighter right shadow (soft glow)
                }}
                placeholder="Enter Username"
                required
              />
            </div>

            <div className="mb-6 relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                style={{
                  boxShadow:
                    "inset 0px 4px 8px rgba(0, 0, 0, 0.6), " + // Darker shadow on top (pressed effect)
                    "inset 0px -4px 8px rgba(255, 255, 255, 0.2), " + // Lighter bottom shadow (soft glow)
                    "inset 4px 0px 8px rgba(0, 0, 0, 0.6), " + // Darker shadow on the left (pressed effect)
                    "inset -4px 0px 8px rgba(255, 255, 255, 0.2)", // Lighter right shadow (soft glow)
                }}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3"
              >
                {passwordVisible ? (
                  <MdVisibilityOff className="text-xl" />
                ) : (
                  <MdVisibility className="text-xl" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-52 h-12 bg-pink-600 text-white text-center py-2 rounded-e-3xl rounded-ss-3xl flex items-center justify-center mx-auto"
            >
              <TbLogin2 className="mr-1" /> Login
            </button>

            <div className="flex sm:flex-row justify-between pt-3 space-x-10">
              <div className="mt-4 text-center text-emerald-400">
                <Link to="/sign-up" className="hover:underline font-normal">
                  Join Here
                </Link>
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/forgot-pass"
                  className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;
