import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import logo from "../assets/images/logo.jpeg";
import { register } from "./helper/apiCalls";

function SignUp({from='signup', sponsorID = ''}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputs,setInputs] = useState({
    sponsor: sponsorID,
    username: "",
    fullname: "",
    email: "",
    country: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if(!inputs.sponsor || !inputs.username || !inputs.fullname || !inputs.email || !inputs.country || !inputs.mobile || !inputs.password || !inputs.confirmPassword) {
      alert("Please fill all the fields")
      return
    }

    const response = await register(inputs)

     ;
    
    if(response.status === 201) {
      alert("User registered successfully")
      setInputs({
        sponsor: "",
        username: "",
        fullname: "",
        email: "",
        country: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      })
    } else {
      alert("Error registering user")
    }
  }

  return (
    <div>
      <div>
        {
          from === 'signup' && (<Navbar />)
        }
        <div className="flex flex-col py-16  min-h-screen bg-[rgba(0,0,0,0.75)]">
          <div
            className="bg-zinc-800 p-6 mt-6 rounded-md relative z-20 w-[90%] sm:w-[70%] md:w-[34rem] max-w-md mx-auto"
            style={{
              boxShadow:
                "0px 10px 30px rgba(0, 0, 0, 0.7), " + // Darker bottom-right shadow for raised effect
                "0px -10px 30px rgba(255, 255, 255, 0.2), " + // Lighter top-left for raised effect
                "10px 0px 30px rgba(0, 0, 0, 0.3), " + // Darker left shadow for depth (similar to bottom-right)
                "0px 10px 30px rgba(0, 0, 0, 0.3), " + // Slight shadow on right/bottom
                "0px -10px 30px rgba(255, 255, 255, 0.2), " + // Slight light effect on top/left
                "-10px 0px 30px rgba(255, 255, 255, 0.2), " + // Lighter left side glow
                "10px 0px 30px rgba(0, 0, 0, 0.7)", // Darker right shadow (similar to bottom)
            }}
          >
            <div className="logo-section rounded-3xl flex justify-center mb-6">
              <div className="flex-shrink-0 pt-4">
                <img src={logo} alt="logo" className="h-12" />
              </div>
            </div>

            <br />
            <h2 className="text-2xl font-strong mb-2 pb-4 mt-0 text-center text-white">
              Sign Up
            </h2>
          

            <form method="POST" onSubmit={handleSubmit}>
              {/* Sponsor Id */}
              <div className="mb-4 text-white">
                <input
                  type="text"
                  id="sponsor-id"
                  name="sponsor"
                  className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
                  placeholder="Sponsor ID *"
                  onChange={handleChange}
                  value={inputs.sponsor}
                  required
                  disabled={from !== 'signup'}
                />
              </div>

              {/* Account Name */}
              <div className="mb-4 text-white">
                <input
                  type="text"
                  id="name"
                  name="username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
                  placeholder="Account Username"
                  required
                  onChange={handleChange}
                  value={inputs.username}
                />
              </div>

              {/* Applicant Name */}
              <div className="mb-4 text-white">
                <input
                  type="text"
                  id="name"
                  name="fullname"
                  className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
                  placeholder="Applicant Name"
                  required
                  onChange={handleChange}
                  value={inputs.fullname}
                />
              </div>

              {/* Email Address */}
              <div className="mb-4 text-white">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
                  placeholder="Email Address"
                  required
                  onChange={handleChange}
                  value={inputs.email}
                />
              </div>

              {/* Mobile Number */}
              <div className="mb-4 text-white">
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
                  placeholder="Mobile"
                  required
                  onChange={handleChange}
                  value={inputs.mobile}
                />
              </div>

              {/* Password */}
              <div className="mb-4 relative text-white">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                  value={inputs.password
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                >~</button>
              </div>

              {/* Confirm Password */}
              <div className="mb-4 relative text-white">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
                  placeholder="Confirm Password"
                  required
                  onChange={handleChange}
                  value={inputs.confirmPassword}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                ></button>
              </div>

              {/* Checkbox for Terms & Conditions */}
              <div className="flex items-center mb-6 text-white">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-8 w-8 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                  onChange={() => setIsDisabled(!isDisabled)}
                />
                <label htmlFor="terms" className="ml-2 text-base text-gray-400">
                  By clicking the button you have confirmed accept the
                  International Holdding Terms & Conditions and Privacy Policy
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isDisabled}
                className="w-28 bg-orange-700 text-white py-2 rounded-md transition duration-200"
              >
                Submit
              </button>

              {/*Login Link*/}
              <div className="flex justify-center mt-4 text-sky-500">
                <a href="/sign-in">Login Here</a>
              </div>
            </form>
          </div>
        </div>

        {
          from === 'signup' && (<Footer />)
        }
        
      </div>
    </div>
  );
}

export default SignUp;
