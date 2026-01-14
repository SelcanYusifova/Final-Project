import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { FaPinterestP } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { MdOutlineLanguage } from "react-icons/md";
import { Link } from 'react-router';








function Footer() {
    return (
        <footer className="w-full bg-white text-gray-800">
            <div className="max-w-6xl mx-auto px-6 pt-20">
                <p className="text-center text-[12px] uppercase text-gray-500">
                    Join our newsletter – enter your email address*
                </p>
                <div className="mt-4 border-b border-gray-300 max-w-md mx-auto" />
            </div>

            <div className=" max-w-6xl mx-auto px-6 mt-20 flex  md:flex-row justify-center gap-16">
                <div className="text-center">
                    <p className="mb-6 text-sm">Follow us on</p>
                    <div className="flex gap-6 justify-center text-xl">
                        <Link to={"https://www.facebook.com/"}><FaFacebookF className='text-[24px]  hover:text-gray-600 duration-75' /></Link>
                        <Link to={"https://www.instagram.com/accounts/login/"}><LuInstagram className='text-[24px]   hover:text-gray-600 duration-75' /></Link>
                        <Link to={"https://www.pinterest.com/"}><FaPinterestP className='text-[24px]  hover:text-gray-600 duration-75' /></Link>
                        <Link to={"https://www.youtube.com/"}><FiYoutube className='text-[24px]  hover:text-gray-600 duration-75' />
                        </Link>
                        <Link to={"https://x.com/"}><FaXTwitter className='text-[24px]  hover:text-gray-600 duration-75' /></Link>
                        <Link to={"https://open.spotify.com/"}><FaSpotify className='text-[24px]  hover:text-gray-600 duration-75' />
                        </Link>
                        <Link to={"https://www.tiktok.com/az/"}><FaTiktok className='text-[24px]  hover:text-gray-600 duration-75' /></Link>
                    </div>
                </div>

                <div className="text-center">
                    <p className="mb-4 text-sm">Download our app</p>
                    <img
                        src="https://static.zarahome.net/assets/public/53c3/63dd/bf8149678ae0/a099eecc5b4a/qr/qr.png?ts=1747129749597"
                        alt="QR Code"
                        className="w-28 h-28 mx-auto"
                    />
                </div>
            </div>

            <div className=" flex flex-row justify-center gap-[50px] mt-[80px]">
                <div>
                    <h4 className="font-bold mb-3 underline uppercase">Policies</h4>
                    <ul className="space-y-[2px] text-gray-600 text-[12px]">
                        <li>Terms and Conditions</li>
                        <li>Privacy Policy</li>
                        <li>Cookies Policy</li>
                        <li>Cookies Settings</li>
                        <li>Legal Mentions</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-3 underline uppercase">Company</h4>
                    <ul className="space-y-[2px] text-gray-600 text-[12px]">
                        <li>Work with us</li>
                        <li>Press</li>
                        <li>Sitemap</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-3 underline uppercase">Contact</h4>
                    <ul className="space-y-[2px] text-gray-600 text-[12px]">
                        <li>Contact</li>
                        <li>Help</li>
                        <li>Guest Purchase</li>
                        <li>Stores</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-3 underline uppercase">
                        You might be interested
                    </h4>
                    <ul className="space-y-[2px] text-gray-600 text-[12px]">
                        <li>Bedroom</li>
                        <li>Duvet Covers</li>
                        <li>Home Decor</li>
                    </ul>
                </div>
            </div>


            <div className="flex items-center mt-20 mb-10 text-center text-xs text-gray-500 justify-center">
                <MdOutlineLanguage />
                American Samoa / English
            </div>
        </footer>
    );
};

export default Footer
