import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { FaPinterestP } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { MdOutlineLanguage } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function Footer({ theme }) {
     const { t, i18n } = useTranslation();

    return (
        <footer className={`${theme === "light" ? "bg-white text-black" : "bg-black text-white"} w-full transition-colors duration-300`}>
            <div className="max-w-6xl mx-auto px-6 pt-20">
                <p className="text-center text-[12px] uppercase text-gray-500">
                    {t("joinNewsletter")}
                </p>
                <div className={`mt-4 border-b ${theme === "light" ? "border-gray-300" : "border-white"} max-w-md mx-auto`} />
            </div>

            <div className="max-w-6xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                <div className="text-center">
                    <p className="mb-6 text-sm hidden sm:block">{t("followUsOn")}</p>
                    <div className="flex flex-wrap justify-center gap-4 text-xl sm:gap-6">
                        <Link to={"https://www.facebook.com/"}><FaFacebookF className={`text-[20px] sm:text-[24px] hover:text-gray-600 duration-75 ${theme === "light" ? "text-black" : "text-white"}`} /></Link>
                        <Link to={"https://www.instagram.com/accounts/login/"}><LuInstagram className={`text-[20px] sm:text-[24px] hover:text-gray-600 duration-75 ${theme === "light" ? "text-black" : "text-white"}`} /></Link>
                        <Link to={"https://www.pinterest.com/"}><FaPinterestP className={`text-[20px] sm:text-[24px] hover:text-gray-600 duration-75 ${theme === "light" ? "text-black" : "text-white"}`} /></Link>
                        <Link to={"https://www.youtube.com/"}><FiYoutube className={`text-[20px] sm:text-[24px] hover:text-gray-600 duration-75 ${theme === "light" ? "text-black" : "text-white"}`} /></Link>
                        <Link to={"https://x.com/"}><FaXTwitter className={`text-[20px] sm:text-[24px] hover:text-gray-600 duration-75 ${theme === "light" ? "text-black" : "text-white"}`} /></Link>
                        <Link to={"https://open.spotify.com/"}><FaSpotify className={`text-[20px] sm:text-[24px] hover:text-gray-600 duration-75 ${theme === "light" ? "text-black" : "text-white"}`} /></Link>
                        <Link to={"https://www.tiktok.com/az/"}><FaTiktok className={`text-[20px] sm:text-[24px] hover:text-gray-600 duration-75 ${theme === "light" ? "text-black" : "text-white"}`} /></Link>
                    </div>
                </div>

                <div className="text-center">
                    <p className="mb-6 text-center text-sm hidden sm:block">{t("downloadApp")}</p>
                   <div className='flex justify-center'>
                     <img
                        src="https://static.zarahome.net/assets/public/53c3/63dd/bf8149678ae0/a099eecc5b4a/qr/qr.png?ts=1747129749597"
                        alt={t("qrCode")}
                        className="w-24 h-24 md:w-28 md:h-28 md:mx-0"
                    />
                   </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 mt-[80px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-[50px] text-center md:text-left">
                <div>
                    <h4 className="font-bold mb-3 underline uppercase">{t("policies")}</h4>
                    <ul className="space-y-[2px] text-[12px]">
                        <li>{t("termsAndConditions")}</li>
                        <li>{t("privacyPolicy")}</li>
                        <li>{t("cookiesPolicy")}</li>
                        <li>{t("cookiesSettings")}</li>
                        <li>{t("legalMentions")}</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-3 underline uppercase">{t("company")}</h4>
                    <ul className="space-y-[2px] text-[12px]">
                        <li>{t("workWithUs")}</li>
                        <li>{t("press")}</li>
                        <li>{t("sitemap")}</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-3 underline uppercase">{t("contact")}</h4>
                    <ul className="space-y-[2px] text-[12px]">
                        <li>{t("contact")}</li>
                        <li>{t("help")}</li>
                        <li>{t("guestPurchase")}</li>
                        <li>{t("stores")}</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-3 underline uppercase">{t("youMightBeInterested")}</h4>
                    <ul className="space-y-[2px] text-[12px]">
                        <li>{t("bedroom")}</li>
                        <li>{t("duvetCovers")}</li>
                        <li>{t("homeDecor")}</li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center mt-20 mb-10 text-center md:text-left text-xs justify-center gap-2">
                <MdOutlineLanguage className={`${theme === "light" ? "text-black" : "text-white"}`} />
                <span className={`${theme === "light" ? "text-black" : "text-white"}`}>{t("language")}</span>
            </div>
        </footer>
    );
};

export default Footer;
