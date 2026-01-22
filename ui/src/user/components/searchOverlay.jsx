import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Products from "./products";
import { useTranslation } from "react-i18next";


function SearchOverlay({ onClose, theme }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
    const { t, i18n } = useTranslation();
  

  useEffect(() => {
    fetch("http://localhost:3000/allProducts")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = data.flatMap((cat) =>
          Object.values(cat.products).flat()
        );
        setProducts(allProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  const filtered = products.filter((p) =>
    p.name[i18n.language].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`fixed inset-0 z-[9999] px-10 pt-[120px] overflow-y-auto
      ${theme === "light" ? "bg-white" : "bg-black"}
    `}>
      <button
        onClick={onClose}
        className={`absolute cursor-pointer top-10 right-10 text-[28px] hover:text-gray-500 duration-150
          ${theme === "light" ? "text-black" : "text-white"}
        `}
      >
        <IoMdClose />
      </button>

      <h1 className={`text-[42px] mb-8 search
        ${theme === "light" ? "text-gray-700" : "text-gray-300"}
      `}>
       {t("searchTitle")}
      </h1>

      <input
        autoFocus
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className={`w-full border-b text-[24px] py-4 outline-none mb-16 placeholder
          ${theme === "light" 
            ? "border-black bg-white text-black placeholder-gray-400" 
            : "border-white bg-black text-white placeholder-gray-500"
          }
        `}
      />

      {search && (
        <div className="row px-4">
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <Products
                key={p.id}
                pro={p}
                colSize={3}
                onClose={onClose}
                theme={theme}
              />
            ))
          ) : (
            <p className={`mt-10 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchOverlay;