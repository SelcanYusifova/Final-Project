import React, { useState } from 'react';
import { GrFavorite } from "react-icons/gr";

function Bedspreadsproducts({ pro, colSize }) {

  return (
    <div className={`col-lg-${colSize} col-md-4 col-sm-6 p-[4px] mb-[100px] cursor-pointer`}>

      <div className="relative group w-full">

        <img
          src={pro.image}
          className="w-full block"
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

      
        </>
      )}
    </div>
  );
}

export default Bedspreadsproducts;
