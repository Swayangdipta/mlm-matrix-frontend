import React from "react";
import logo from "../assets/images/logo.jpeg";
import {
  TiSocialFacebookCircular,
  TiSocialLinkedinCircular,
  TiSocialTwitterCircular,
} from "react-icons/ti";

function Footer() {
  return (
    <div className="w-full bg-[#184e77] text-white pt-30 flex flex-col items-center">
      <div className="flex-shrink-0">
        <img src={logo} alt="logo" className="h-12 " />
      </div>

      <p className="text-center md:mx-[23rem] sm:mx-[8rem] pt-9">
      Pro Deal is a trusted investment company providing innovative solutions to grow and manage your portfolio. With secure and transparent strategies, we help you navigate the world of investments with ease. Begin your investment journey today with our expert guidance and reliable platform.
      </p>

      <div className="flex justify-between items-center text-white p-4 text-3xl">
        <TiSocialFacebookCircular className=""/>
        <TiSocialLinkedinCircular className=""/>
        <TiSocialTwitterCircular className=""/>
      </div>

      <div className="flex justify-between mt-5">
        <a href="/t&c" className="hover:bg-[#001845] text-white rounded-full px-4 py-2 transition active:scale-95">Terms of Service</a>   
        <a href="/privacy-policy" className="ml-4 hover:bg-[#001845] text-white rounded-full px-4 py-2 transition active:scale-95">Privacy Policy</a>
      </div>

      <hr className="border-t-2 border-gray-700 mt-[8rem] w-full" />
      <p className="pt-5 pb-8">&#169; 2025 Prodeal Helping Hand. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
