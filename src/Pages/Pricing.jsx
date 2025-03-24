import React from "react";
import { useNavigate } from "react-router-dom";

function Pricing() {

  const navigate = useNavigate();

  const handleInvestNowButtonClick = () => {
    navigate("/sign-up");

  };
  return (
    <section id="our-plan" className="text-center py-32 bg-[#00296b]">
      <h1 className="text-white text-5xl font-bold">Our Plan</h1>
      <p className="pt-6 text-lg text-white">
        "Invest ₹1200, lose ₹600, and you'll have to double your remaining ₹600
        just to recover your original investment."
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-16 ml-8 mr-8 px-4 md:px-6">
        {/* Basic Plan */}
        <div className="bg-white text-center p-4 sm:p-8 rounded-lg shadow-lg mx-4 sm:mx-6 lg:mx-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#00296b]">
            Basic
          </h2>
          <p className="text-sm sm:text-lg text-[#00296b] py-2 sm:py-4">
            Perfect for beginners.
          </p>
          <p className="text-xl sm:text-3xl font-bold text-[#00296b]">
            $100/month
          </p>

          <div className="border-t-2 border-[#00296b] my-4"></div>

          <ul className="text-left text-sm sm:text-lg text-[#555] py-2 sm:py-4">
            <li>Direct Referral Bonus : $10</li>
            <li>L1 : $20 X 3 = $60</li>
            <li>L2 : $15 X 9 = $135</li>
            <li>L3 : $13 X 27 = $351</li>
            <li>L4 : $10 X 81 = $810</li>
            <br />
            <hr className="border-[#555]" />
            <li className="pt-2">
              {" "}
              <span className="font-semibold">
                Total Level Commission : $1,356.00 USD
              </span>{" "}
              <br />
              Returns <span className="bg-[#ffc600] text-white">1356% </span> of
              Invest
            </li>
          </ul>

          <div className="border-t-2 border-[#00296b] my-4"></div>

          <button className="bg-[#00296b] text-white py-2 px-4 sm:py-2 sm:px-6 rounded-md cursor-pointer" onClick={handleInvestNowButtonClick}>
            Invest Now
          </button>
        </div>

        {/* Standard Plan */}
        <div className="bg-white text-center p-8 sm:p-10 rounded-lg shadow-lg mx-4 sm:mx-6 lg:mx-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#00296b]">
            Standard
          </h2>
          <p className="text-sm sm:text-lg text-[#00296b] py-2 sm:py-4">
            Perfect for growing teams.
          </p>
          <p className="text-xl sm:text-3xl font-bold text-[#00296b]">
            $500/month
          </p>

          <div className="border-t-2 border-[#00296b] my-4"></div>

          <ul className="text-left text-sm sm:text-lg text-[#555] py-2 sm:py-4">
            <li>Direct Referral Bonus : $50</li>
            <li>L1 : $140 X 3 = $420</li>
            <li>L2 : $100 X 9 = $900</li>
            <li>L3 : $80 X 27 = $2160</li>
            <li>L4 : $60 X 81 = $4860</li>
            <br />
            <hr className="border-[#555]" />
            <li className="pt-2">
              {" "}
              <span className="font-semibold">
                Total Level Commission : $8,340.00 USD
              </span>{" "}
              <br />
              Returns <span className="bg-[#ffc600] text-white">1668% </span> of
              Invest
            </li>
          </ul>

          <div className="border-t-2 border-[#00296b] my-4"></div>

          <button className="bg-[#00296b] text-white py-2 px-4 sm:py-2 sm:px-6 rounded-md cursor-pointer" onClick={handleInvestNowButtonClick}>
            Invest Now
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white text-center p-4 sm:p-8 rounded-lg shadow-lg mx-4 sm:mx-6 lg:mx-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#00296b]">
            Premium
          </h2>
          <p className="text-sm sm:text-lg text-[#00296b] py-2 sm:py-4">
            Perfect for experienced marketers.
          </p>
          <p className="text-xl sm:text-3xl font-bold text-[#00296b]">
            $1000/month
          </p>

          <div className="border-t-2 border-[#00296b] my-4"></div>

          <ul className="text-left text-sm sm:text-lg text-[#555] py-2 sm:py-4">
            <li>Direct Referral Bonus : $100</li>
            <li>L1 : $300 X 3 = $900</li>
            <li>L2 : $200 X 9 = $1800</li>
            <li>L3 : $175 X 27 = $4725</li>
            <li>L4 : $150 X 81 = $12150</li>
            <br />
            <hr className="border-[#555]" />
            <li className="pt-2">
              {" "}
              <span className="font-semibold">
                Total Level Commission : $19,575.00 USD
              </span>{" "}
              <br />
              Returns <span className="bg-[#ffc600] text-white">
                1957.5%{" "}
              </span>{" "}
              of Invest
            </li>
          </ul>

          <div className="border-t-2 border-[#00296b] my-4"></div>

          <button className="bg-[#00296b] text-white py-2 px-4 sm:py-2 sm:px-6 rounded-md cursor-pointer" onClick={handleInvestNowButtonClick}>
            Invest Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
