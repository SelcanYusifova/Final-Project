import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function SecondaryNavbar() {
  const { categorySlug, subcategorySlug } = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

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
    <nav className="w-full bg-white fixed top-26 left-0 z-40 ">
    
      <div className="px-6 pt-3 pb-1 text-xs text-gray-500 whitespace-nowrap">
        {category.title}
        {subcategorySlug ? ` > ${subcategorySlug.replace("-", " ").toUpperCase()}` : ""}
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="w-1/4"></div>

        <div
          className="relative w-2/4 flex items-center overflow-x-auto"
          style={{
            scrollbarWidth: "none", 
            msOverflowStyle: "none", 
          }}
        >
          <style>
            {`
              div::-webkit-scrollbar {
                display: none; // Chrome, Safari
              }
            `}
          </style>

          <ul className="flex gap-8 text-sm uppercase tracking-wide whitespace-nowrap">
            {category.subcategories.map((sub) => (
              <li
                key={sub.id}
                className={`cursor-pointer ${
                  sub.slug === subcategorySlug
                    ? "text-black border-b border-black pb-1"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                <Link to={`/${category.slug}/${sub.slug}`}>
                  {sub.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

   
        <div className="flex items-center gap-6 text-xs uppercase text-gray-700 w-1/4 justify-end">
          <div className="flex items-center gap-2">
            <span>View</span>
            <div className="w-20 h-px bg-gray-400 relative">
              <span className="absolute left-1/2 -top-1 w-2 h-2 bg-black rounded-full"></span>
            </div>
          </div>
          <span className="cursor-pointer hover:text-black">Filters</span>
          <span className="cursor-pointer hover:text-black">Sort</span>
        </div>
      </div>
    </nav>
  );
}

export default SecondaryNavbar;