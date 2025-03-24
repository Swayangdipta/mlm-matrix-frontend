import React from "react";
import Navbar from "./Navbar";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Footer from "./Footer";

function Contact() {
  return (
    <div>
      <Navbar />
      <div className="bg-[#184e77] text-center py-20">
        <h1 className="text-white text-5xl font-bold">Contact</h1>
        <p className="pt-6 text-lg text-white">Home - Contact Us</p>
      </div>

      <div className="boxes grid md:grid-cols-3 sm:grid-cols-1 gap-y-4 mt-20 md:ml-16 md:mr-16 sm:ml-0 sm:mr-0">
        <div className="box1 md:ml-20 bg-[#184e77] text-white h-[10rem] md:w-[22rem] sm:w-[16rem] rounded-md flex flex-row items-center">
          <div className="icon ml-4 text-xl h-20 w-20 rounded-full bg-[#1e6091]">
            <FaPhoneVolume className="text-[#e36414] text-3xl mt-6 ml-6" />
          </div>
          <div className="ml-6">
            <h1 className="font-bold text-2xl">Phone</h1>
            <p className="text-[#e36414] text-lg font-sans">+91 9876543210</p>
          </div>
        </div>
        <div className="box1 md:ml-10 bg-[#184e77] text-white h-[10rem] w-full sm:w-[22rem] rounded-md flex flex-row items-center">
          <div className="icon ml-4 text-xl h-20 w-20 rounded-full bg-[#1e6091]">
            <MdMarkEmailRead className="text-[#e36414] text-4xl mt-6 ml-6" />
          </div>
          <div className="ml-6">
            <h1 className="font-bold text-2xl">Email</h1>
            <p className="text-[#e36414] text-lg">support@prodeal.com</p>
          </div>
        </div>
        <div className="box1 bg-[#184e77] text-white h-[10rem] w-full sm:w-[22rem] rounded-md flex flex-row items-center">
          <div className="icon ml-4 text-xl h-20 w-20 rounded-full bg-[#1e6091]">
            <IoLocationSharp className="text-[#e36414] text-4xl mt-6 ml-6" />
          </div>
          <div className="ml-6">
            <h1 className="font-bold text-2xl">Address</h1>
            <p className="text-[#e36414] text-lg">abc, Punjab, 251658</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="py-6 px-4 sm:py-20 sm:px-20 sm:ml-16 sm:mr-16">
        <div className="bg-[#184e77] text-white p-6 rounded-lg">
          <h1 className="py-4 sm:py-10 text-2xl sm:text-3xl font-bold text-center">
            Contact Us for Assistance
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name and Email Row */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="p-4 rounded-md bg-white text-[#184e77] text-lg"
                placeholder="Your Name"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="p-4 rounded-md bg-white text-[#184e77] text-lg"
                placeholder="Your Email"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-lg font-semibold mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="p-4 rounded-md bg-white text-[#184e77] text-lg"
                placeholder="Subject"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-lg font-semibold mb-2">Message</label>
              <textarea
                className="p-4 rounded-md bg-white text-[#184e77] text-lg h-40"
                placeholder="Your Message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:col-span-2">
              <button
                type="submit"
                className="p-4 rounded-md bg-[#e36414] text-white text-lg font-bold hover:bg-[#fb8b24] transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default Contact;
