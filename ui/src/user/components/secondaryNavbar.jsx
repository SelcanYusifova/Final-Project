import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ViewController from "./ViewController";
import { useTranslation } from "react-i18next";




function SecondaryNavbar({ colSize, setColSize, onFilterClick, theme }) {
  const { categorySlug, subcategorySlug } = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const { t, i18n } = useTranslation();


  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        const cat = data.find((c) => c.slug === categorySlug);
        setCategory(cat);
      });
  }, [categorySlug]);

  if (!category) return null;

  return (
    <nav
      className={`w-full fixed top-26 left-0 z-40 secondarynav
        ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}
      `}
    >
      <div
        className={`px-6 pt-3 pb-1 text-xs whitespace-nowrap
          ${theme === "light" ? "text-gray-500" : "text-gray-400"}
        `}
      >
        {category.title[i18n.language]}
        {subcategorySlug && category.subcategories && (
          <>
            {" > "}
            {category.subcategories.find(sub => sub.slug === subcategorySlug)?.title[i18n.language]}
          </>
        )}
      </div>


      <div
        className="px-6 py-4 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>
          {`
            div::-webkit-scrollbar { display: none; }
          `}
        </style>

        <ul className="flex gap-8 text-sm uppercase tracking-wide whitespace-nowrap">
          {category.subcategories.map((sub) => (
            <li key={sub.id} className="cursor-pointer pb-1">
              <Link
                to={`/${category.slug}/${sub.slug}`}
                className={`
                  block transition-colors
                  ${sub.slug === subcategorySlug
                    ? theme === "light"
                      ? "text-black border-b border-black"
                      : "text-white border-b border-white"
                    : theme === "light"
                      ? "text-gray-500 hover:text-black"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >
                {sub.title[i18n.language]}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Filter və View Controller */}
      <div
        className={`px-6 pb-4 flex items-center gap-6 text-xs uppercase justify-end
          ${theme === "light" ? "text-gray-700" : "text-gray-300"}
        `}
      >
        <p
          className={`text-xs whitespace-nowrap cursor-pointer duration-150
            ${theme === "light" ? "text-gray-500 hover:text-black" : "text-gray-400 hover:text-white"}
          `}
          onClick={onFilterClick}
        >
          {t("filter")}
        </p>
        <p className="text-xs font-[600] whitespace-nowrap hidden lg:inline">|</p>
        <ViewController colSize={colSize} setColSize={setColSize} theme={theme} />
      </div>
    </nav>
  );
}

export default SecondaryNavbar;
