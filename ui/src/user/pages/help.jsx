import React from "react";
import emailjs from "@emailjs/browser";
import { toast, Bounce } from "react-toastify";

function Help() {

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_3prylp8",      
      "template_3jca0tp",     
      e.target,
      "qn5HIhBnGTdL6gST0"     
    )
    .then((result) => {
      toast.success("Mesaj göndərildi! Tezliklə sizinlə əlaqə saxlanacaq.", {
        position: "top-center",
        autoClose: 5000,
        transition: Bounce
      });
      e.target.reset(); 
    }, (error) => {
      toast.error("Xəta baş verdi: " + error.text, {
        position: "top-center",
        autoClose: 5000,
        transition: Bounce
      });
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-[24px] py-[80px] mt-[100px] help">

      
      <h1 className="text-[32px] md:text-[40px] font-semibold mb-[24px] helptext">
        Help & Customer Service
      </h1>
      <p className="text-[16px] text-gray-600 mb-[48px]">
        Find answers to our most frequently asked questions or contact our support team.
      </p>

      <div className="flex flex-col gap-[32px]">

        <div className="border-b border-gray-200 pb-[24px]">
          <h2 className="text-[20px] font-medium mb-[8px]">Order Tracking</h2>
          <p className="text-[14px] text-gray-600">
            You can track your order status by logging into your account or using the tracking link sent to your email.
          </p>
        </div>

        <div className="border-b border-gray-200 pb-[24px]">
          <h2 className="text-[20px] font-medium mb-[8px]">Returns & Exchanges</h2>
          <p className="text-[14px] text-gray-600">
            Returns can be made within 30 days of purchase. Make sure your items are in original condition.
          </p>
        </div>

        <div className="border-b border-gray-200 pb-[24px]">
          <h2 className="text-[20px] font-medium mb-[8px]">Payment Methods</h2>
          <p className="text-[14px] text-gray-600">
            We accept all major credit cards, PayPal, and gift cards. All transactions are secure.
          </p>
        </div>

        <div className="border-b border-gray-200 pb-[24px]">
          <h2 className="text-[20px] font-medium mb-[8px]">Shipping Information</h2>
          <p className="text-[14px] text-gray-600">
            Orders are usually processed within 1-2 business days. Delivery times vary by location.
          </p>
        </div>

      </div>


      <div className="mt-[64px] border-t border-gray-200 pt-[32px]">
        <h2 className="text-[24px] font-semibold mb-[16px]">Contact Us</h2>
        <p className="text-gray-600 mb-[24px]">
          Send us a message and our support team will get back to you.
        </p>

        <form onSubmit={sendEmail} className="flex flex-col gap-[32px] max-w-[420px]">
          
          <div className="relative">
            <input
              type="text"
              name="user_name"
              placeholder=" "
              required
              className="peer w-full bg-transparent border-b border-black outline-none py-[6px] text-[14px] focus:border-b-2"
            />
            <label className="absolute left-0 top-[6px] text-[12px] font-[500] transition-all duration-200
              peer-focus:-top-[14px] peer-focus:text-[10px]
              peer-[:not(:placeholder-shown)]:-top-[14px]
              peer-[:not(:placeholder-shown)]:text-[10px]">
              Your Name*
            </label>
          </div>

       
          <div className="relative">
            <input
              type="email"
              name="user_email"
              placeholder=" "
              required
              className="peer w-full bg-transparent border-b border-black outline-none py-[6px] text-[14px] focus:border-b-2"
            />
            <label className="absolute left-0 top-[6px] text-[12px] font-[500] transition-all duration-200
              peer-focus:-top-[14px] peer-focus:text-[10px]
              peer-[:not(:placeholder-shown)]:-top-[14px]
              peer-[:not(:placeholder-shown)]:text-[10px]">
              Your Email*
            </label>
          </div>

       
          <div className="relative">
            <textarea
              name="message"
              placeholder=" "
              required
              className="peer w-full bg-transparent border-b border-black outline-none py-[6px] text-[12px] resize-none focus:border-b-2"
            />
            <label className="absolute left-0 top-[6px] text-[12px] font-[500] transition-all duration-200
              peer-focus:-top-[14px] peer-focus:text-[10px]
              peer-[:not(:placeholder-shown)]:-top-[14px]
              peer-[:not(:placeholder-shown)]:text-[10px]">
              Your Message*
            </label>
          </div>

     
          <button
            type="submit"
            className="w-full bg-black text-white px-[48px] py-[12px] text-[12px] font-[600] tracking-widest transition hover:bg-[#1E1E1E] cursor-pointer"
          >
            Send Message
          </button>

        </form>
      </div>

    </div>
  );
}

export default Help;
