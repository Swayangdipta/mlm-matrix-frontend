import React from 'react'
import { MdOutlinePayment, MdOutlineSecurity } from "react-icons/md";
import { PiHandDeposit } from "react-icons/pi";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import {RiCustomerService2Line,} from "react-icons/ri";


function Features() {
  return (
    <section id="our-features" className="bg-[#031d44] text-center py-20">
    <h1 className="text-white text-5xl font-bold">Our Feature</h1>
    <p className="pt-6 text-lg text-white">
      Powerful Features to Simplify and Accelerate Your Network Marketing{" "}
      <br />
      Business with MatrixLab's All-in-One Solution.
    </p>
    <div className="boxes grid grid-cols-[1fr_auto_1fr] gap-6 mt-20">
      <div></div>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-y-20 gap-6">
        <div className="box1 relative flex flex-col items-center border-2 border-t-0 border-[#ccdbdc] h-[12rem] w-[22rem] rounded-xl">
          <div className="absolute top-[-32px] left-1/2 transform -translate-x-1/2 p-6 rounded-full border-2 border-gray-500 flex items-center justify-center bg-white z-10">
            <MdOutlinePayment className="text-5xl text-[#c1121f] pt-4" />
          </div>
          <div className="absolute">
            <p className="text-2xl  text-[#86bbd8] pt-20">
              Multiple Payment Options
            </p>
            <p className="text-base  text-slate-200 mt-3">
              Accept payments via cards, cryptocurrencies, and mobile money
            </p>
          </div>
        </div>
        <div className="box2 relative flex flex-col items-center border-2 border-t-0 border-[#ccdbdc] h-[12rem] w-[22rem] rounded-xl">
          <div className="absolute top-[-32px] left-1/2 transform -translate-x-1/2 p-6 rounded-full border-2 border-gray-500 flex items-center justify-center bg-white z-10">
            <RiCustomerService2Line className="text-5xl text-[#c1121f] pt-4" />
          </div>
          <div className="absolute">
            <p className="text-2xl  text-[#86bbd8] pt-20">
              Customer Support
            </p>
            <p className="text-base  text-slate-200 mt-3">
              Get 24/7 expert assistance for setup, troubleshooting, and
              customization.
            </p>
          </div>
        </div>
        <div className="box3 relative flex flex-col items-center border-2 border-t-0 border-[#ccdbdc] h-[12rem] w-[22rem] rounded-xl">
          <div className="absolute top-[-32px] left-1/2 transform -translate-x-1/2 p-6 rounded-full border-2 border-gray-500 flex items-center justify-center bg-white z-10">
            <PiHandDeposit className="text-5xl text-[#c1121f] pt-4" />
          </div>
          <div className="absolute">
            <p className="text-2xl  text-[#86bbd8] pt-20">Deposit limit</p>
            <p className="text-base  text-slate-200 mt-3">
              Set flexible deposit limits to manage transactions securely
              and efficiently.
            </p>
          </div>
        </div>
        <div className="box4 relative flex flex-col items-center border-2 border-t-0 border-[#ccdbdc] h-[12rem] w-[22rem] rounded-xl">
          <div className="absolute top-[-32px] left-1/2 transform -translate-x-1/2 p-6 rounded-full border-2 border-gray-500 flex items-center justify-center bg-white z-10">
            <MdOutlineSecurity className="text-5xl text-[#c1121f] pt-4" />
          </div>
          <div className="absolute">
            <p className="text-2xl  text-[#86bbd8] pt-20">2FA Security</p>
            <p className="text-base  text-slate-200 mt-3">
              Enhance account protection with two-factor authentication for
              secure access.
            </p>
          </div>
        </div>
        <div className="box5 relative flex flex-col items-center border-2 border-t-0 border-[#ccdbdc] h-[12rem] w-[22rem] rounded-xl">
          <div className="absolute top-[-32px] left-1/2 transform -translate-x-1/2 p-6 rounded-full border-2 border-gray-500 flex items-center justify-center bg-white z-10">
            <FaMoneyBillTransfer className="text-5xl text-[#c1121f] pt-4" />
          </div>
          <div className="absolute">
            <p className="text-2xl  text-[#86bbd8] pt-20">Referral Bonus</p>
            <p className="text-base  text-slate-200 mt-3">
              Earn rewards for every successful referral and grow your
              network effortlessly.
            </p>
          </div>
        </div>
        <div className="box6 relative flex flex-col items-center border-2 border-t-0 border-[#ccdbdc] h-[12rem] md:w-[26rem] sm:w-[22rem] rounded-xl">
          <div className="absolute top-[-32px] left-1/2 transform -translate-x-1/2 p-6 rounded-full border-2 border-gray-500 flex items-center justify-center bg-white z-10">
            <BsLightningChargeFill className="text-5xl text-[#c1121f] pt-4" />
          </div>
          <div className="absolute">
            <p className="text-2xl  text-[#86bbd8] pt-20">Epin Recharge</p>
            <p className="text-base  text-slate-200 mt-3">
              Securely recharge your account using unique E-PINs for
              seamless transactions.
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </section>
  )
}

export default Features
