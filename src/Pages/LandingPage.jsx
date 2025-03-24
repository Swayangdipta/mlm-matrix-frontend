import React from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import bg from "../assets/images/wallpaper.png";
import electronics from "../assets/images/electronics.png";
import Pricing from "./Pricing";
import Features from "./Features";
import Start from "./Start";
import FAQ from "./FAQ";
import Footer from "../Components/Footer";
import ClientFeedback from "./ClientFeedback";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { VscVmRunning } from "react-icons/vsc";

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStartedButtonClick = () => {
    navigate("/sign-in");
  };

  const handleInvestNowButtonClick = () => {
    navigate("/sign-up");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* content */}
      <section
        id="introPage"
        className="relative h-screen flex flex-col justify-center py-16 px-4 text-white bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <h1 className="pt-32">
          <span className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-100 ml-20 font-mono block mb-4">
            PRODEAL
          </span>
          <span className="text-4xl sm:text-5xl md:text-6xl font-semibold ml-28 font-serif text-[#ffc600] block mb-4">
            helping hand
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl py-10 ml-10 font-semibold text-white">
          Welcome to the world of multi-level
          <br /> marketing, one of the fastest-growing
          <br />
          industry of the future
          <br />
          <br />
          "A unit of Sahnewal Group (Regd.),
          <br /> a trusted name in multi-services."
        </p>
        <div className="pt-12 pb-32 flex flex-col sm:flex-row sm:gap-8 gap-4">
          <button
            className="px-6 py-3 rounded-xl active:scale-95 bg-[#ffc600] text-white text-lg sm:text-xl md:text-lg"
            onClick={handleGetStartedButtonClick}
          >
            Get Started
          </button>
          <button
            className="px-7 py-3 rounded-xl border-2 border-gray-400 active:scale-95 hover:bg-[#ffc600] text-white text-lg sm:text-xl md:text-lg"
            onClick={handleInvestNowButtonClick}
          >
            Invest Now
          </button>
        </div>
      </section>

      <Pricing />
      <Start />

      <section
        id="moto"
        className="bg-[#e7ecef] flex flex-col md:flex-row justify-evenly items-center py-20"
      >
        <div className="text-center md:text-left md:ml-10 sm:ml-6">
          <h1 className="text-5xl sm:text-4xl md:text-5xl font-bold">
            Unlock Your Potential: The Benefits of Investing in Our Business
          </h1>
          <ul className="py-10 md:list-none space-y-4 sm:space-y-4 md:space-y-6">
            <li className="relative pl-8 text-blue-800 hover:text-blue-600 text-lg sm:text-base md:text-lg">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
              Achieve Financial Security Through Investment
            </li>
            <li className="relative pl-8 text-blue-800 hover:text-blue-600 text-lg sm:text-base md:text-lg">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
              Enjoy the Flexibility of Work Hours
            </li>
            <li className="relative pl-8 text-blue-800 hover:text-blue-600 text-lg sm:text-base md:text-lg">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
              Gain the Freedom to Be Your Own Boss
            </li>
            <li className="relative pl-8 text-blue-800 hover:text-blue-600 text-lg sm:text-base md:text-lg">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
              Experience a Higher Quality of Life
            </li>
            <li className="relative pl-8 text-blue-800 hover:text-blue-600 text-lg sm:text-base md:text-lg">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
              Unlock the Freedom to Travel While Earning
            </li>
            <li className="relative pl-8 text-blue-800 hover:text-blue-600 text-lg sm:text-base md:text-lg">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
              Secure a Bright and Promising Future with Us
            </li>
          </ul>

          <button
            className="px-8 py-4 rounded-xl mb-20 active:scale-95 bg-[#ffc600] text-white text-xl sm:text-lg sm:px-6 sm:py-3"
            onClick={handleInvestNowButtonClick}
          >
            Invest Now
          </button>
        </div>

        <img
          src={electronics}
          alt="video"
          className="w-[25rem] sm:w-[28rem] md:mr-10 mt-8 md:mt-0"
        />
      </section>

      <section id="statistics" className="bg-[#003249] text-center py-32">
        <h1 className="text-white text-5xl font-bold">Our Statistics</h1>
        <p className="pt-6 text-lg text-white">
          "Rule #1: Never lose money. <br />
          Rule #2: Always remember Rule #1."
        </p>
        <div className="boxes grid grid-cols-[1fr_auto_1fr]  gap-10 mt-16">
          <div></div>
          <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-10 ">
            <div className="box1 flex flex-col items-center border-2 border-t-0 border-[#ccdbdc] h-[11rem] w-[19rem] rounded-xl">
              <BsFillPeopleFill className="text-5xl text-[#e36414] pt-4" />
              <p className="text-2xl text-[#86bbd8] pt-8">Total Clients</p>
              <p className="text-xl text-slate-200">200K</p>
            </div>
            <div className="box2 flex flex-col items-center border-2 border-t-0 border-[#ccdbdc] h-[11rem] w-[19rem] rounded-xl">
              <GiPayMoney className="text-5xl text-[#e36414] pt-4" />
              <p className="text-2xl text-[#86bbd8] pt-8">Total Deposit</p>
              <p className="text-xl text-slate-200">20000 USD</p>
            </div>
            <div className="box3 flex flex-col items-center border-2 border-t-0 border-[#ccdbdc] h-[11rem] w-[19rem] rounded-xl">
              <GiTakeMyMoney className="text-5xl text-[#e36414] pt-4" />
              <p className="text-2xl text-[#86bbd8] pt-8">Total Withdraw</p>
              <p className="text-xl text-slate-200">300M</p>
            </div>
            <div className="box4 flex flex-col items-center border-2 border-t-0 border-[#ccdbdc] h-[11rem] w-[19rem] rounded-xl">
              <VscVmRunning className="text-5xl text-[#e36414] pt-4" />
              <p className="text-2xl text-[#86bbd8] pt-8">Company Run</p>
              <p className="text-xl text-slate-200">323Y</p>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      <Features />
      <ClientFeedback />

      <FAQ />

      <section id="registration" className="bg-[#212529] text-center pt-30">
        <h1 className="text-white text-4xl font-bold">
          Get Started with MatrixLab Today!
        </h1>
        <p className="pt-6 text-lg text-white">
          Register now to start your network marketing journey with MatrixLab.
          Sign
          <br />
          up, set up, and start earning today!
        </p>

        <button
          className="px-8 py-4 mt-10 rounded-xl mb-20 active:scale-95 bg-[#ffc600] text-white text-xl"
          onClick={handleInvestNowButtonClick}
        >
          Join Now
        </button>
      </section>

      <section id="subscribe" className="text-center py-20 bg-[#780000]">
        <h1 className="text-white text-4xl font-bold">
          Subscribe Our Newsletter to get the <br />
          news and updates first
        </h1>
        <button className="mt-16 bg-[#fdf0d5] w-full sm:w-[36rem] md:w-[32rem] h-[3.5rem] rounded-4xl">
          Your Email Address
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
