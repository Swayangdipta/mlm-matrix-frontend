import React from "react";
import Navbar from "./Navbar";
import Start from "../Pages/Start";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { VscVmRunning } from "react-icons/vsc";
import FAQ from "../Pages/FAQ";
import Footer from "./Footer";

function HowItWorks() {
  return (
    <div>
      <Navbar />
      <Start />
      <section id="statistics" className="bg-[#003249] text-center py-32">
        <h1 className="text-white text-5xl font-bold">Our Statistics</h1>
        <p className="pt-6 text-lg text-white">
          Unleashing Success: Track Record of Growth, Engagement, and Profits in{" "}
          <br />
          Network Marketing with MatrixLab.
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
      <FAQ />
      <Footer />
    </div>
  );
}

export default HowItWorks;
