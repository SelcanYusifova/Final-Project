import React, { useState, useEffect } from 'react';
import { FiSearch} from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import AdminSearchModal from '../components/search';

function AdminHeader({ onOpenModal }) {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) setIsLoggedIn(true);

    const savedImage = localStorage.getItem("adminProfileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setProfileImage(imageData);
        localStorage.setItem("adminProfileImage", imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    localStorage.removeItem("adminProfileImage");
  };

  return (
    <>
      <header className="fixed w-[1262px] bg-white border-b border-gray-200 px-8 h-[70px] flex items-center justify-between z-[100] ">
        <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex-1 max-w-md mx-8 flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        >
          <FiSearch className="text-xl text-gray-500" />
          <span className="text-gray-500 font-medium">Search products...</span>
        </button>

        <div className='flex gap-[20px] items-center'>
          <div className="flex items-center gap-[6px]">
            <div className="relative group">
              
              {/* Profil dairəsi */}
              <div className="cursor-pointer w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 cursor-pointer transition-all duration-200 overflow-hidden  hover:scale-105">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div
                    className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('profile-upload').click()}
                  >
                    <FaRegUser className="text-gray-500 text-lg" />
                  </div>
                )}
              </div>

              {/* X düyməsi — artıq dairənin çölündə */}
              {profileImage && (
                <button
                  onClick={removeProfileImage}
                  className="cursor-pointer absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-lg transition-all duration-200 hover:scale-110"
                  title="Şəkli sil"
                >
                  ×
                </button>
              )}

              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                className="hidden"
              />

              
                
            </div>

            {isLoggedIn ? (
              <button
                onClick={logOut}
                className="hidden md:inline text-[12px] font-[600] text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
              >
                LOG OUT
              </button>
            ) : (
              <NavLink
                to="/login"
                className="hidden md:inline text-[12px] font-[600] text-gray-700 hover:text-gray-900"
              >
                LOG IN
              </NavLink>
            )}
          </div>

          <button
            onClick={onOpenModal}
            className="px-6 py-2 bg-[#e5e5e5] hover:bg-black hover:text-white cursor-pointer font-medium transition-all duration-150"
          >
            Add Product
          </button>
        </div>
      </header>

      {isSearchOpen && (
        <AdminSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
}

export default AdminHeader;
