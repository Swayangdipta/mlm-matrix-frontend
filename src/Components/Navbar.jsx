import React, { useState } from "react";
import logo from "../assets/images/logo.jpeg";
import { FaSignInAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-[#184e77]">
      <div className="flex justify-between items-center gap-5 container mx-auto py-[0.8rem]">
        {/* logo */}
        <div className="flex-shrink-0 ">
          <img src={logo} alt="logo" className="h-12" />
        </div>

        {/* Desktop navigation menu */}
        <div className="hidden md:flex flex-grow justify-center space-x-4">
          <Link
            className="home hover:bg-[#001845] text-white rounded-full px-4 py-2 transition active:scale-95"
            to="/"
          >
            Home
          </Link>
          <Link
            className="hover:bg-[#001845] text-white rounded-full px-4 py-2 transition active:scale-95"
            to="/about"
          >
            About
          </Link>
          <Link
            className="hover:bg-[#001845] text-white rounded-full px-4 py-2 transition active:scale-95"
            to="/how-it-works"
          >
            How It works
          </Link>
          <Link
            className="hover:bg-[#001845] text-white rounded-full px-4 py-2 transition active:scale-95"
            to="/plan"
          >
            Plan
          </Link>
          <Link
            className="hover:bg-[#001845] text-white rounded-full px-4 py-2 transition active:scale-95"
            to="/Contact"
          >
            Contact
          </Link>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden flex items-center">
          <FaBars
            className="text-white text-2xl cursor-pointer mr-2"
            onClick={toggleMenu}
          />
        </div>

        {/* Sign buttons (Desktop) */}
        <div className="hidden md:flex space-x-4">
          <Link
            className="hover:bg-[#ffc600] text-white rounded-full px-4 py-2 transition flex items-center active:scale-95"
            to="/sign-in"
          >
            Sign In <FaSignInAlt className="ml-2" />
          </Link>
          <Link
            className="hover:bg-[#ffc600] text-white rounded-full px-4 py-2 flex items-center transition active:scale-95"
            to="/sign-up"
          >
            Sign Up <FaSignOutAlt className="ml-2 rotate-270" />
          </Link>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 right-0 w-56 h-full bg-[#184e77] z-50 transform transition-transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center pt-12">
          {/* Close Button */}
          <div className="flex justify-center items-center flex-row">
            <p className="text-2xl font-semibold font-serif text-orange-600 shadow-2xl">
              MENU
            </p>
            <div className="absolute top-5 right-2">
              <MdOutlineKeyboardDoubleArrowRight
                className="text-white text-3xl cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
          </div>

          {/*Menu list */}
          <Link
            className="hover:bg-[#001845] text-white rounded-full px-4 py-2 my-3 transition-all active:scale-95 border-b-2 border-gray-400"
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
          >
            Home
          </Link>
          <Link
            className="hover:bg-[#001845] text-white rounded-full px-4 py-2 my-3 transition-all active:scale-95 border-b-2 border-gray-400"
            to="/about"
          >
            About
          </Link>
          <Link
            className="hover:bg-[#001845] text-white rounded-full px-4 py-2 my-3 transition-all active:scale-95 border-b-2 border-gray-400"
            to="/how-it-works"
          >
            How It works
          </Link>
          <Link
            className="hover:bg-[#001845] text-white rounded-full px-4 py-2 my-3 transition-all active:scale-95 border-b-2 border-gray-400"
            to="/plan"
          >
            Plan
          </Link>
          <Link
            className="hover:bg-[#001845] text-white rounded-full px-4 py-2 my-3 transition-all active:scale-95 border-b-2 border-gray-400"
            to="/contact"
          >
            Contact
          </Link>

          <div className="mt-12 space-x-4 space-y-3">
            <Link
              className="bg-[#ffc600] text-white rounded-full px-4 py-2 transition-all flex items-center active:scale-95"
              to="/sign-in"
            >
              Sign In <FaSignInAlt className="ml-2" />
            </Link>
            <Link
              className="bg-[#ffc600] text-white rounded-full px-4 py-2 flex items-center transition-all active:scale-95"
              to="/sign-up"
            >
              Sign Up <FaSignOutAlt className="ml-2 rotate-270" />
            </Link>
          </div>

          <select name="" id=""></select>

        </div>
      </div>
    </div>
  );
}

export default Navbar;
