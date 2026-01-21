import React from "react";

const PriceRangeSlider = ({
  priceRange,
  setPriceRange,
  min = 0,
  max = 1000,
  theme,
}) => {
  const [minVal, maxVal] = priceRange;

  const thumbColor = theme === "light" ? "black" : "white"; // dairə rəngi

  return (
    <div className="w-full">
      <div className="relative h-6">
        {/* Base line */}
        <div
          className={`absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2
            ${theme === "light" ? "bg-gray-300" : "bg-gray-600"}
          `}
        />

        {/* Active range */}
        <div
          className={`absolute top-1/2 h-[2px] -translate-y-1/2
            ${theme === "light" ? "bg-black" : "bg-white"}
          `}
          style={{
            left: `${(minVal / max) * 100}%`,
            right: `${100 - (maxVal / max) * 100}%`,
          }}
        />

        {/* MIN */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(e) =>
            setPriceRange([Math.min(+e.target.value, maxVal - 1), maxVal])
          }
          className="range-input absolute w-full h-full z-20"
          style={{ "--thumb-color": thumbColor }}
        />

        {/* MAX */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) =>
            setPriceRange([minVal, Math.max(+e.target.value, minVal + 1)])
          }
          className="range-input absolute w-full h-full z-30"
          style={{ "--thumb-color": thumbColor }}
        />
      </div>

      <div className="flex justify-between text-xs mt-4">
        <span>{minVal} €</span>
        <span>{maxVal} €</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
