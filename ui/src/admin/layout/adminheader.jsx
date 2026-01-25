import React, { useState, useEffect } from 'react';
import { FaRegUser } from "react-icons/fa6";
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function AdminHeader() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) setIsLoggedIn(true);
  }, []);

  const logOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login"); 
  };

  return (
    <header className="h-[70px] bg-white justify-between flex items-center px-8 border border-[#dddddd] z-1000">
      <h1 className="text-xl font-semibold">Admin Panel</h1>

      <div className="flex-1 max-w-md mx-8">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
        />
      </div>

      <div className='flex gap-[20px]'>
        <div className="flex items-center gap-[6px] leading-none">    
          <FaRegUser className={`text-[18px]`} />

          {isLoggedIn ? (
            <button onClick={logOut} className="hidden md:inline text-[12px] font-[600] cursor-pointer">
              {t("logout")}
            </button>
          ) : (
            <NavLink to="/login" className="hidden md:inline text-[12px] font-[600]">
              {t("login")}
            </NavLink>
          )}
        </div>

        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Add Product
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
