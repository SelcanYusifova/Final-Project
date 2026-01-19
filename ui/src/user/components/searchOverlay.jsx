import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Products from "./products";

function SearchOverlay({ onClose }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

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
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-white z-[9999] px-10 pt-[120px] overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-10 right-10 text-[28px]  hover:text-gray-500 duration-150"
      >
        <IoMdClose />
      </button>

      <h1 className="text-[42px] text-gray-700 mb-8">
        WHAT ARE YOU SEARCHING FOR?
      </h1>

      <input
        autoFocus
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full border-b border-black text-[24px] py-4 outline-none mb-16"
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
              />
            ))
          ) : (
            <p className="mt-10 text-gray-500">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchOverlay;
