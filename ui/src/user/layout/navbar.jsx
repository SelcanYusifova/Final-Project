import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { FiHelpCircle, FiSearch } from "react-icons/fi";
import { BsBasket3 } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import SearchOverlay from "../components/searchOverlay";
import { LuSun, LuMoon } from "react-icons/lu";
import { useTranslation } from "react-i18next";



function Navbar({ theme, toggleTheme }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [bool, setbool] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const languageFlags = {
    az: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg",
    en: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
    ru: "https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg",
  };



  useEffect(() => {
    let id = localStorage.getItem("id");
    if (id) {
      setbool(true);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("id");
  };

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const toggleCategory = (id) => {
    setActiveCategory((prev) => (prev === id ? null : id));
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLangOpen && !event.target.closest('.language-dropdown')) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangOpen]);

  return (
    <nav className={`w-full fixed top-0 left-0 z-5000 ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <div className="container-fluid px-4 overflow-visible">
        <div className="grid grid-cols-12 items-center py-4 overflow-visible">

          <div className="col-span-5 overflow-visible">
            <div className="relative group flex items-center gap-[32px] w-[360px] max-w-full overflow-visible">

              <div className={`
                  fixed top-0 left-0 h-screen
                  w-[240px] lg:w-[340px]
                  ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}
                  opacity-0 -translate-x-full pointer-events-none
                  group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto
                  transition-all duration-500 z-[999]
                `}>
                <ul className={`p-4 lg:p-8 space-y-3 lg:space-y-4 text-[14px] lg:text-[16px] font-[600] mt-[80px]  ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
                  {categories.map((e) => (
                    <li key={e.id}>
                      <div
                        onClick={() => toggleCategory(e.id)}
                        className="cursor-pointer flex justify-between items-center"
                      >
                        {e.title[i18n.language]}
                        {e.subcategories.length > 0 && (
                          <span>{activeCategory === e.id ? "−" : "+"}</span>
                        )}
                      </div>

                      {activeCategory === e.id && e.subcategories.length > 0 && (
                        <ul
                          className={`mt-2 ml-3 lg:ml-4 space-y-2 text-[13px] lg:text-[14px] font-normal transition-colors
                              ${theme === "light"
                              ? "text-gray-600 hover:text-black"
                              : "text-gray-300 hover:text-white"
                            }`}
                        >
                          {e.subcategories.map((sub) => (
                            <li key={sub.id}>
                              <Link
                                to={`/${e.slug}/${sub.slug}`}
                                className={`block cursor-pointer transition-colors
                                     ${theme === "light"
                                    ? "text-gray-600 hover:text-black"
                                    : "text-gray-300 hover:text-white"
                                  }`}
                              >
                                {sub.title[i18n.language]}
                              </Link>
                            </li>

                          ))}
                        </ul>
                      )}
                    </li>
                  ))}

                  {/* Dil seçimi - yalnız mobil və tablet üçün (md-dən kiçik) */}
                  <li className="pt-6 border-t border-gray-300 md:hidden">
                    <div className="relative language-dropdown">
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setIsLangOpen(!isLangOpen)}
                      >
                        <img
                          src={languageFlags[i18n.language]}
                          alt={i18n.language}
                          className="w-6 h-4 rounded-sm object-cover"
                        />
                        <span className="font-semibold">
                          {i18n.language.toUpperCase()}
                        </span>
                      </div>

                      <ul
                        className={`
        mt-2 w-28 rounded-lg shadow-lg p-1
        ${theme === "light" ? "bg-white" : "bg-gray-900"}
        ${isLangOpen ? "block" : "hidden"}
      `}
                      >
                        <li
                          className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg transition ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}
                          onClick={() => changeLanguage("az")}
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg" className="w-5 h-3" />
                          AZ
                        </li>

                        <li
                          className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg transition ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}
                          onClick={() => changeLanguage("en")}
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" className="w-5 h-3" />
                          EN
                        </li>

                        <li
                          className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg transition ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}
                          onClick={() => changeLanguage("ru")}
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg" className="w-5 h-3" />
                          RU
                        </li>
                      </ul>
                    </div>
                  </li>


                </ul>
              </div>

              <RxHamburgerMenu className={`text-[24px] cursor-pointer transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-6  ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`} />

              <Link
                to={"/"}
                className={`logo cursor-pointer transition-transform duration-[0.4s] relative z-[1000] group-hover:-translate-x-[32px]  ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}
              >
                LUMERA
              </Link>
            </div>
          </div>

          <div className="col-span-2 text-center hidden lg:block">
            <span
              onClick={() => setIsSearchOpen(true)}
              className={`relative text-[14px] font-medium cursor-pointer ${theme === "light" ? "text-black" : "text-white"}`}
            >
              {t("search")}
              <span
                className={`absolute left-0 -bottom-1 w-30 h-[1px] ${theme === "light" ? "bg-black" : "bg-white"}`}
              ></span>
            </span>
          </div>


          <div className="col-span-7 lg:col-span-5 flex justify-end items-center gap-[16px] ">


            <div className={`py-[22px] px-[12px] rounded-xl flex gap-[4px] h-[0px] items-center justify-center
  ${theme === "light" ? "bg-black" : "bg-white"}`}
            >
              <button
                className={`bg-transparent p-[8px] rounded-lg text-[18px] 
      ${theme === "light" ? "text-white" : "text-black"} cursor-pointer`}
                onClick={toggleTheme}
              >
                {theme === "light" ? <LuMoon /> : <LuSun />}
              </button>
            </div>

            {/* Dil seçimi - yalnız desktop üçün (md və daha böyük) */}
            <div className="relative group language-dropdown hidden md:block">
              <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setIsLangOpen(!isLangOpen)}>
                <img
                  src={languageFlags[i18n.language]}
                  alt={i18n.language.toUpperCase()}
                  className="w-6 h-4 rounded-sm object-cover"
                />
                <span className="text-sm font-semibold">{i18n.language.toUpperCase()}</span>
              </div>

              <ul className={`absolute right-0 mt-2 w-32 rounded-xl shadow-lg p-1 transition-all duration-200
  ${theme === "light" ? "bg-white" : "bg-gray-900"}
  ${isLangOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                <li className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition
    ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}
                  onClick={() => changeLanguage("az")}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg" alt="AZ" className="w-6 h-4 rounded-sm object-cover" />
                  AZ
                </li>
                <li className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition
    ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}
                  onClick={() => changeLanguage("en")}>
                  <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="EN" className="w-6 h-4 rounded-sm object-cover" />
                  EN
                </li>
                <li className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition
    ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}
                  onClick={() => changeLanguage("ru")}>
                  <img src="https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg" alt="RU" className="w-6 h-4 rounded-sm object-cover" />
                  RU
                </li>
              </ul>
            </div>



            <FiSearch
              onClick={() => setIsSearchOpen(true)}
              className={`text-[20px] lg:hidden cursor-pointer ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}
            />

            <div className="flex items-center gap-[6px] leading-none">


              <FaRegUser className={`text-[18px] ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`} />
              {bool ? (
                <NavLink to={"login"} onClick={logOut} className={`hidden md:inline text-[12px] font-[600] ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
                  {t("logout")}
                </NavLink>
              ) : (
                <NavLink to={"login"} className={`hidden md:inline text-[12px] font-[600] ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
                  {t("login")}
                </NavLink>
              )}
            </div>

            <NavLink to={"/help"} className="flex items-center gap-[6px] leading-none">
              <FiHelpCircle className={`text-[18px] ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`} />
              <span className={`text-[12px] font-[600] hidden md:inline ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
                {t("help")}
              </span>
            </NavLink>

            <NavLink to={"/basket"} className="flex items-center gap-[6px] leading-none">
              <BsBasket3 className={`text-[18px] ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`} />
              <span className={`text-[12px] font-[600] hidden md:inline ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>{t("basket")}</span>
            </NavLink>

          </div>

        </div>
      </div>

      {isSearchOpen && (
        <SearchOverlay onClose={() => setIsSearchOpen(false)} theme={theme} />
      )}
    </nav>
  );
}

export default Navbar;