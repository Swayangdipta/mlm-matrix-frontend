import React, { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null); // State to track which question is open

  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the current question if it's already open
    } else {
      setOpenIndex(index); // Open the new question
    }
  };

  const answers = [
    "MatrixLab is an all-in-one network marketing platform offering referral systems, downline management, payment options, and an easy-to-setup solution for businesses.",
    "Yes, MatrixLab uses advanced encryption and implements two-factor authentication (2FA) to protect your data and ensure secure access to your platform.",
    "Sign up by creating an account, selecting a plan, and customizing your website. The process is quick and simple to start your business.",
    "Yes, MatrixLab provides real-time commission tracking, allowing you to monitor your earnings, manage referrals, and view your financial progress anytime.",
    "MatrixLab accepts multiple payment methods, including credit/debit cards, cryptocurrencies, and mobile money, offering flexibility for users worldwide to make transactions.",
    "MatrixLab offers 24/7 customer support to assist with any issues related to setup, troubleshooting, or business inquiries, ensuring timely assistance."
  ];

  return (
    <div className="bg-[#edf2f4] text-center py-20">
      <h1 className="text-5xl font-bold">FAQ's</h1>
      <p className="pt-2 text-lg">
        Find answers to common questions and get quick support with our FAQs.
      </p>
      <section id="question-answers" className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 ml-4 mr-4 pt-10 ">
        {/* FAQ Item */}
        {['What is ProDeal?', 'How do I use ProDeal?', 'What are the benefits?', 'Is ProDeal secure?', 'What payment methods do you support?', 'How can I contact support?'].map((question, index) => (
          <div key={index} className="border-2 bg-[#8d99ae] border-gray-500 py-3 flex flex-col items-start mb-4">
            <div
              className="flex items-center justify-between w-full cursor-pointer"
              onClick={() => toggleAnswer(index)} // Toggle the answer visibility
            >
              <p className="text-lg text-start ml-4">{question}</p>
              <p className="text-3xl mr-4 mb-1">{openIndex === index ? "-" : "+"}</p>
            </div>
            {/* Dropdown answer with smooth transition */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'} `}
            >
              <div className="bg-white text-gray-800 py-3 px-4 w-full mt-2">
                <p>{answers[index]}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default FAQ;
