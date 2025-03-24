import React from 'react'
import {
  RiUserSettingsFill,
  RiShareForward2Fill,
} from "react-icons/ri";
import { FaCoins } from "react-icons/fa6";
import { BsPersonFillAdd } from "react-icons/bs";

function Start() {
  return (
    <section
        id="how-to-get-started"
        className="bg-[#212529] text-center py-32"
      >
        <h1 className="text-white text-5xl font-bold">How To Get Started?</h1>
        <p className="pt-6 text-lg text-white">
          Quick and Easy Steps to Launch Your Network Marketing Business with{" "}
          <br />
          MatrixLab.
        </p>
        <div className="boxes grid md:grid-cols-2 sm:grid-cols-1 gap-4 py-20 px-5">
          <div className="box1 flex flex-row items-center justify-center">
            <div className="icon bg-red-500 rounded-full h-[85px] w-[85px] flex-none flex items-center justify-center">
              <BsPersonFillAdd className="text-3xl" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl text-white text-start">Sign Up</h1>
              <p className="text-lg text-white text-start pt-2">
                Create an account and choose your business plan to get started
                with MatrixLab.
              </p>
            </div>
          </div>
          <div className="box2 flex flex-row items-center justify-center w-full">
            <div className="icon bg-red-500 rounded-full h-[85px] w-[85px] flex-none flex items-center justify-center">
              <RiUserSettingsFill className="text-3xl" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl text-white text-start">
                Set Up Your Profile
              </h1>
              <p className="text-lg text-white text-start pt-2 overflow-clip">
                Complete your profile, customize your platform, and configure
                settings for a seamless experience.
              </p>
            </div>
          </div>
          <div className="box3 flex flex-row items-center justify-center">
            <div className="icon bg-red-500 rounded-full h-[85px] w-[85px] flex-none flex items-center justify-center">
              <RiShareForward2Fill className="text-3xl" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl text-white text-start">
                Invite Referrals
              </h1>
              <p className="text-lg text-white text-start pt-2">
                Use the referral system to grow your downline and expand your
                network marketing business.
              </p>
            </div>
          </div>
          <div className="box4 flex flex-row items-center justify-center">
            <div className="icon bg-red-500 rounded-full h-[85px] w-[85px] flex-none flex items-center justify-center">
              <FaCoins className="text-3xl" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl text-white text-start">Start Earning</h1>
              <p className="text-lg text-white text-start pt-2">
                Track commissions, manage earnings, and withdraw funds easily
                through various secure payment options.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Start
