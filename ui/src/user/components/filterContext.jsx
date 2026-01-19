import { IoMdClose } from "react-icons/io";

function FilterPanel({ priceRange, setPriceRange, onClose }) {
    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed right-0 top-0 h-full w-[400px] bg-white z-50 flex flex-col">
                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-sm font-semibold">FILTERS</h2>
                    <IoMdClose
                        onClick={onClose}
                        className="cursor-pointer text-xl"
                    />
                </div>

                <div className="p-5 flex-1">
                    <p className="text-xs font-semibold mb-4">PRICE RANGE</p>

                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[0]}
                        onChange={(e) =>
                            setPriceRange([+e.target.value, priceRange[1]])
                        }
                        className="w-full"
                    />

                    <div className="flex justify-between text-xs mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>

       
                <button
                    onClick={() => setPriceRange([0, 1000])}
                     className="w-full cursor-pointer bg-[#e5e5e5] py-3 text-[14px] hover:bg-black hover:text-white transition font-medium"
                >
                    DELETE
                </button>
            </div>
        </>
    );
}

export default FilterPanel;
