import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { FiHelpCircle, FiSearch } from "react-icons/fi";
import { BsBasket3 } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import SearchOverlay from "../components/searchOverlay";
import { LuSun, LuMoon } from "react-icons/lu";


function Navbar({ theme, toggleTheme }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [bool, setbool] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);


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

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
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
                        {e.title}
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
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
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
              SEARCH
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


            <FiSearch
              onClick={() => setIsSearchOpen(true)}
              className={`text-[20px] lg:hidden cursor-pointer ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}
            />

            <div className="flex items-center gap-[6px] leading-none">
              <FaRegUser className={`text-[18px] ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`} />
              {bool ? (
                <NavLink to={"login"} onClick={logOut} className={`hidden md:inline text-[12px] font-[600] ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
                  LOG OUT
                </NavLink>
              ) : (
                <NavLink to={"login"} className={`hidden md:inline text-[12px] font-[600] ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
                  LOG IN
                </NavLink>
              )}
            </div>

            <NavLink to={"/help"}>
              <div className="flex items-center gap-[6px] leading-none">
                <FiHelpCircle className={`text-[18px] ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`} />
                <Link to={"/help"} className={`text-[12px] font-[600] hidden md:inline ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
                  HELP
                </Link>
              </div>
            </NavLink>

            <NavLink to={"basket"}>
              <div className="flex items-center gap-[6px] leading-none">
                <BsBasket3 className={`text-[18px] ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`} />
                <span className={`text-[12px] font-[600] hidden md:inline ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>BASKET</span>
              </div>
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
