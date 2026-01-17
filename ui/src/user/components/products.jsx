import React, { useState } from 'react';
import { GrFavorite } from "react-icons/gr";
import { useNavigate } from 'react-router';

function Products({ pro, colSize }) {
  const [selectedColor, setSelectedColor] = useState(0);
  let navigate = useNavigate();

  const goDetail = () => {
    navigate(`/allproducts/${pro.id}`);
  };

  const hasVariants = Array.isArray(pro.variants) && pro.variants.length > 0;

  const productImage = hasVariants
    ? pro.variants[selectedColor]?.image
    : pro.image;

  return (
    <div className={`col-lg-${colSize} col-md-4 col-sm-6 p-[4px] mb-[100px] cursor-pointer`}>
      
      <div className="relative group w-full" onClick={goDetail}>
        <img
          src={productImage}
          className="w-full block"
          alt={pro.name}
        />

        <div
          className="
            absolute inset-0
            bg-black/40
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300
            flex items-end
          "
        >
          <button
            className="
              w-full
              bg-[#e5e5e5]
              text-black
              py-3
              text-[14px]
              hover:bg-black hover:text-white
              transition
              cursor-pointer
            "
          >
            Add to cart
          </button>
        </div>
      </div>

      {colSize > 1 && (
        <>
          <div className="flex justify-between mt-[8px]">
            <p className="text-[14px]">{pro.name}</p>
            <GrFavorite className="text-[16px] mt-[3px] cursor-pointer" />
          </div>

          {hasVariants && (
            <div className="flex gap-3 items-center mt-[8px]">
              {pro.variants.map((variant, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full cursor-pointer ${
                    selectedColor === index ? 'border border-black' : ''
                  }`}
                  style={{ backgroundColor: variant.hex }}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setSelectedColor(index);
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
