import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import electronics from "../assets/images/electronics.png";

function About() {
  return (
    <div className="about-page">
      <Navbar />
      <div className="bg-[#184e77] text-center py-20">
        <h1 className="text-white text-5xl font-bold">About</h1>
        <p className="pt-6 text-lg text-white">Home - About</p>
      </div>
      <section
        id="moto"
        className="bg-[#e7ecef] flex flex-col md:flex-row justify-evenly items-center py-20"
      >
        <div className="text-center md:text-left">
          <h1 className="text-5xl sm:text-4xl md:text-5xl font-bold">
            Make Best Invest Business <br /> Through Us
          </h1>
          <p className="pt-4 text-xl sm:text-lg text-gray-700">
            Invest smartly and grow your business with MatrixLab.
          </p>
          <p className="pt-6 pb-12 text-gray-700 text-base sm:text-sm">
            Start your network marketing journey with MatrixLab. Our all-in-one
            platform <br />
            offers easy setup, referral systems, and secure payment options to
            help your <br />
            business thrive and scale effortlessly.
          </p>
          <button className="px-8 py-4 rounded-xl mb-20 active:scale-95 bg-[#ffc600] text-white text-xl sm:text-lg sm:px-6 sm:py-3">
            Invest Now
          </button>
        </div>

        <img
          src={electronics}
          alt="video"
          className="md:w-[25rem] sm:w-[28rem] mt-8 md:mt-0"
        />
      </section>

      <Footer />
    </div>
  );
}

export default About;
