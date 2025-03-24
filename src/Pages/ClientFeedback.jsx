import React from "react";
import { MdOutlinePayment } from "react-icons/md";

function ClientFeedback() {
  return (
    <div className='client-feedback" className=" text-center py-32 bg-[#9d0208]'>
      <h1 className="text-white text-5xl font-bold">What Our Client's Say</h1>
      <p className="pt-6 text-lg text-white">
        See What Our Clients Have to Say About Their Success with MatrixLab.
      </p>

      <div className="boxes mt-20 mx-10">
        <div className="flex flex-col sm:flex-col md:flex-row justify-evenly items-center gap-12 sm:gap-16 md:gap-16">
          <div className="box1 relative flex flex-col items-start bg-[#fdf0d5] h-[16rem] w-full rounded-xl">
            <div className="absolute top-[-32px] right-16 transform translate-x-1/2 p-6 rounded-full text-black flex items-center justify-center bg-white z-10 w-24 h-24">
              <img
                src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid"
                alt="Default pic"
                className="w-full h-full object-cover rounded-full"
                style={{ transform: "scale(2.0)" }}
              />
            </div>
            <div className="absolute">
              <p className="text-2xl text-left pt-20 ml-4">Michael Jhonson</p>
              <p className="text-left ml-4">Digital Marketer</p>
              <p className="text-base text-left mt-3 ml-4">
                The secure 2FA and seamless payment options provide me with
                peace of mind while managing my growing network.
              </p>
            </div>
          </div>

          <div className="box2 relative flex flex-col items-start bg-[#fdf0d5] h-[16rem] w-full rounded-xl">
            <div className="absolute top-[-32px] right-16 transform translate-x-1/2 p-6 rounded-full text-black flex items-center justify-center bg-white z-10 w-24 h-24">
              <img
                src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid"
                alt="Default pic"
                className="w-full h-full object-cover rounded-full"
                style={{ transform: "scale(2.0)" }}
              />
            </div>
            <div className="absolute">
              <p className="text-2xl text-left pt-20 ml-4">Michael Jhonson</p>
              <p className="text-left ml-4">Digital Marketer</p>
              <p className="text-base text-left mt-3 ml-4">
                The secure 2FA and seamless payment options provide me with
                peace of mind while managing my growing network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientFeedback;
