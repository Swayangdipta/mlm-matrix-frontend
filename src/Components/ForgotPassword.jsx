import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TbLogin2 } from "react-icons/tb";
import logo from "../assets/images/logo.jpeg";

function ForgotPassword() {
  const [username, setUsername] = useState("");

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
            Reset Password
          </h2>

          <form>
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

            <div className="flex sm:flex-row justify-between  space-x-10">
              <p>
                Still no Account? 
                <span className="mt-4 text-center ml-2">
                  <Link
                    to="/sign-up"
                    className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
                  >
                    Create new account
                  </Link>
                </span>
              </p>
            </div>

            <button
              type="submit"
              className="w-52 h-12 bg-pink-600 text-white text-center my-4 py-4 rounded-e-3xl rounded-ss-3xl flex items-center justify-center mx-auto"
            >
              <TbLogin2 className="mr-1" /> Reset Password
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ForgotPassword;
