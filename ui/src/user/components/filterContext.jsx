import { IoMdClose } from "react-icons/io";
import PriceRangeSlider from "./priceRangeSlider";
import { useTranslation } from "react-i18next";


function FilterPanel({ priceRange, setPriceRange, onClose, theme }) {
  const { t, i18n } = useTranslation();
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: theme === "light" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.1)" }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-[400px] flex flex-col z-50
          ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}
        `}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center p-5 border-b
            ${theme === "light" ? "border-gray-300" : "border-gray-700"}
          `}
        >
          <h2 className="text-sm font-semibold">{t("filter")}</h2>
          <IoMdClose onClick={onClose} className="cursor-pointer text-xl" />
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-xs font-semibold mb-6">{t("priceRange")}</p>

          <PriceRangeSlider
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            min={0}
            max={1000}
            theme={theme}  
          />
        </div>

        <button
          onClick={() => setPriceRange([0, 1000])}
          className={`mt-auto w-full py-3 text-sm transition cursor-pointer
            ${theme === "light"
              ? "bg-gray-200 hover:bg-black hover:text-white"
              : "bg-gray-800 hover:bg-white hover:text-black"
            }
          `}
        >
          {t("delete")}
        </button>
      </div>
    </>
  );
}

export default FilterPanel;
