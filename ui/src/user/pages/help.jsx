import React from "react";
import emailjs from "@emailjs/browser";
import { toast, Bounce } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

function Help() {
  const { t, i18n } = useTranslation();
  const { theme } = useOutletContext();

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
          transition: Bounce,
          theme: theme === "dark" ? "dark" : "light"
        });
        e.target.reset();
      }, (error) => {
        toast.error("Xəta baş verdi: " + error.text, {
          position: "top-center",
          autoClose: 5000,
          transition: Bounce,
          theme: theme === "dark" ? "dark" : "light"
        });
      });
  };

  return (
    <div className={`max-w-[1200px] mx-auto px-[24px] py-[80px] mt-[100px] help transition-colors
      ${theme === "light" ? "text-black" : "text-white"}`}>

      <h1 className="text-[32px] md:text-[40px] font-semibold mb-[24px] helptext">
        {t("helpCustomerService")}
      </h1>
      <p className={`text-[16px] mb-[48px]
        ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
        {t("helpCustomerServiceDesc")}
      </p>

      <div className="flex flex-col gap-[32px]">

        <div className={`border-b pb-[24px]
          ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
          <h2 className="text-[20px] font-medium mb-[8px]">{t("orderTracking")}</h2>
          <p className={`text-[14px]
            ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
            {t("orderTrackingDesc")}
          </p>
        </div>

        <div className={`border-b pb-[24px]
          ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
          <h2 className="text-[20px] font-medium mb-[8px]">{t("returnsExchanges")}</h2>
          <p className={`text-[14px]
            ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
            {t("returnsExchanges")}
          </p>
        </div>

        <div className={`border-b pb-[24px]
          ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
          <h2 className="text-[20px] font-medium mb-[8px]">{t("paymentMethods")}</h2>
          <p className={`text-[14px]
            ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
            {t("paymentMethodsDesc")}
          </p>
        </div>

        <div className={`border-b pb-[24px]
          ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
          <h2 className="text-[20px] font-medium mb-[8px]">{t("shippingInfo")}</h2>
          <p className={`text-[14px]
            ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
            {t("shippingInfoDesc")}
          </p>
        </div>

      </div>

      <div className={`mt-[64px] pt-[32px]
        ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
        <h2 className="text-[24px] font-semibold mb-[16px]">{t("contactUs")}</h2>
        <p className={`mb-[24px]
          ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
          {t("contactUsDesc")}
        </p>

        <form onSubmit={sendEmail} className="flex flex-col gap-[32px] max-w-[420px]">

          <div className="relative">
            <input
              type="text"
              name="user_name"
              placeholder=" "
              required
              className={`peer w-full bg-transparent outline-none py-[6px] text-[14px]
                border-b focus:border-b-2 transition-colors
                ${theme === "light" 
                  ? "border-black text-black" 
                  : "border-white text-white"}`}
            />
            <label className={`absolute left-0 top-[6px] text-[12px] font-[500] transition-all duration-200
              peer-focus:-top-[14px] peer-focus:text-[10px]
              peer-[:not(:placeholder-shown)]:-top-[14px]
              peer-[:not(:placeholder-shown)]:text-[10px]
              ${theme === "light" ? "text-black" : "text-white"}`}>
              {t("yourName")}
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="user_email"
              placeholder=" "
              required
              className={`peer w-full bg-transparent outline-none py-[6px] text-[14px]
                border-b focus:border-b-2 transition-colors
                ${theme === "light" 
                  ? "border-black text-black" 
                  : "border-white text-white"}`}
            />
            <label className={`absolute left-0 top-[6px] text-[12px] font-[500] transition-all duration-200
              peer-focus:-top-[14px] peer-focus:text-[10px]
              peer-[:not(:placeholder-shown)]:-top-[14px]
              peer-[:not(:placeholder-shown)]:text-[10px]
              ${theme === "light" ? "text-black" : "text-white"}`}>
              {t("yourEmail")}
            </label>
          </div>

          <div className="relative">
            <textarea
              name="message"
              placeholder=" "
              required
              className={`peer w-full bg-transparent outline-none py-[6px] text-[12px] resize-none
                border-b focus:border-b-2 transition-colors
                ${theme === "light" 
                  ? "border-black text-black" 
                  : "border-white text-white"}`}
            />
            <label className={`absolute left-0 top-[6px] text-[12px] font-[500] transition-all duration-200
              peer-focus:-top-[14px] peer-focus:text-[10px]
              peer-[:not(:placeholder-shown)]:-top-[14px]
              peer-[:not(:placeholder-shown)]:text-[10px]
              ${theme === "light" ? "text-black" : "text-white"}`}>
              {t("yourMessage")}
            </label>
          </div>

          <button
            type="submit"
            className={`w-full px-[48px] py-[12px] text-[12px] font-[600]
              tracking-widest transition cursor-pointer
              ${theme === "light" 
                ? "bg-black text-white hover:bg-[#1E1E1E]" 
                : "bg-white text-black hover:bg-gray-200"}`}>
            {t("send")}
          </button>

        </form>
      </div>

    </div>
  );
}

export default Help;