import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";
import { BsBasket3 } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchOverlay from "../components/searchOverlay";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [bool, setbool] = useState(false)
  useEffect(() => {
    let id = localStorage.getItem("id");
    if (id) {
      setbool(true);
    }
  }, []);
  const logOut = () => {
    localStorage.removeItem("id");
  }
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const toggleCategory = (id) => {
    setActiveCategory((prev) => (prev === id ? null : id));
  };

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="container-fluid px-4 overflow-visible">
        <div className="row items-center justify-between py-4 overflow-visible">

          <div className="col-lg-5 overflow-visible">
            <div className="relative group flex items-center gap-[32px] w-[360px] overflow-visible">

              <div
                className="
                  fixed top-0 left-0 h-screen w-[340px] bg-white
                  opacity-0 -translate-x-full
                  group-hover:opacity-100 group-hover:translate-x-0
                  transition-all duration-500 z-[999]
                "
              >
                <ul className="p-8 space-y-4 text-[16px] font-[600] text-[#1E1E1E] mt-[80px]">
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
                        <ul className="mt-2 ml-4 space-y-2 text-[14px] font-normal text-gray-600">
                          {e.subcategories.map((sub) => (
                            <li key={sub.id} className="cursor-pointer hover:text-black">
                              <Link to={`/${e.slug}/${sub.slug}`}>
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

              <RxHamburgerMenu
                className="
                  text-[24px] cursor-pointer
                  transition-all duration-300
                  group-hover:opacity-0 group-hover:-translate-x-6
                "
              />

              <Link to={"/"}
                className="
                  logo cursor-pointer
                  transition-transform duration-[0.4s]
                  relative z-[1000]
                  group-hover:-translate-x-[32px]
                "
              >
                LUMERA
              </Link>
            </div>
          </div>

          <div className="col-lg-2 text-center">
            <span
              onClick={() => setIsSearchOpen(true)}
              className="relative inline-block text-[14px] font-medium cursor-pointer"
            >
              SEARCH
              <span className="absolute left-0 -bottom-1 w-30 h-[1px] bg-black"></span>
            </span>
          </div>

          <div className="col-lg-5 flex justify-end items-center gap-[16px] cursor-pointer">
            <div className="flex items-center gap-[6px] leading-none">
              <FaRegUser className="text-[18px]" />
              {
                bool ? <NavLink to={"login"} onClick={logOut} className="text-[12px] font-[600]">LOG OUT</NavLink> : <NavLink to={"login"} className="text-[12px] font-[600]">LOG IN</NavLink>
              }
            </div>
            <div className="flex items-center gap-[6px] leading-none">
              <FiHelpCircle className="text-[18px]" />
              <Link to={"/help"} className="text-[12px] font-[600]">HELP</Link>
            </div>
            <NavLink to={"basket"}>
              <div className="flex items-center gap-[6px] leading-none">
                <BsBasket3 className="text-[18px]" />
                <span className="text-[12px] font-[600]">BASKET</span>
              </div>
            </NavLink>
          </div>

        </div>
      </div>
      {/* SEARCH OVERLAY */}
      {isSearchOpen && (
        <SearchOverlay onClose={() => setIsSearchOpen(false)} />
      )}
    </nav>
  );
}

export default Navbar;
