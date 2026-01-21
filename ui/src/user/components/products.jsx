import React, { useState } from 'react';
import { GrFavorite } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

function Products({ pro, colSize, onClose, theme }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const goDetail = () => {
    navigate(`/allproducts/${pro.id}`);
  };

  const hasVariants = Array.isArray(pro.variants) && pro.variants.length > 0;
  const hasSizes = Array.isArray(pro.sizes) && pro.sizes.length > 0;

  const productImage = hasVariants
    ? pro.variants[selectedColor]?.image
    : pro.image;

  const currentSize = hasSizes ? pro.sizes[selectedSize] : null;

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!id) {
      toast.error('Sign in to add products to cart!', {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    setShowPanel(true);
  };

  const confirmAddToCart = async () => {
    const cartItem = {
      userId: id,
      productId: pro.id,
      name: pro.name,
      image: productImage,
      color: hasVariants ? pro.variants[selectedColor].color : null,
      colorHex: hasVariants ? pro.variants[selectedColor].hex : null,
      size: currentSize ? currentSize.type : null,
      price: currentSize ? currentSize.price : pro.price,
      oldPrice: currentSize ? currentSize.oldPrice : pro.oldPrice,
      quantity: 1
    };

    const res = await fetch("http://localhost:3000/basket");
    const data = await res.json();

    const existingItem = data.find(item =>
      item.userId === id &&
      item.productId === cartItem.productId &&
      item.color === cartItem.color &&
      item.size === cartItem.size
    );

    if (existingItem) {
      await fetch(`http://localhost:3000/basket/${existingItem.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          quantity: existingItem.quantity + 1
        })
      });
    } else {
      await fetch("http://localhost:3000/basket", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(cartItem)
      });
    }

    toast.success("Product successfully added to cart", {
      position: "top-center",
      autoClose: 2000,
      transition: Bounce,
    });

    setShowPanel(false);
  };

  return (
    <>
      <div className={`col-lg-${colSize} col-md-4 col-sm-6 p-[4px] mb-[100px] product`}>
        <div
          className="relative group w-full cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link to={`/allproducts/${pro.id}`}>
            <img
              src={productImage}
              className="w-full block"
              alt={pro.name}
              onClick={onClose}
            />
          </Link>

          {isHovered && (
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-end pointer-events-none">
              <button
                className="cursor-pointer w-full bg-[#e5e5e5] text-black py-3 text-[14px] hover:bg-black hover:text-white transition pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(e);
                }}
              >
                Add to cart
              </button>
            </div>
          )}
        </div>

        {colSize > 1 && (
          <>
            <div className="flex justify-between mt-[8px]">
              <p className="text-[14px]">{pro.name}</p>
              <p>{pro.sizes[0].price} $</p>
            </div>

            {hasVariants && (
              <div className="flex gap-3 items-center mt-[8px]">
                {pro.variants.map((variant, index) => (
                  <div
                    key={index}
                    className={`w-6 h-6 rounded-full cursor-pointer ${selectedColor === index ? 'border-1 border-black' : 'border border-gray-300'
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

      {showPanel && (
        <>
         <div
  className="fixed inset-0 z-40 bg-transparent"
  onClick={() => setShowPanel(false)}
/>

          <div className={`fixed right-0 top-0 h-full w-[450px] z-50 shadow-2xl overflow-y-auto panel
      ${theme === "light" ? "bg-white" : "bg-black"}
    `}>

            <div className={`flex justify-between items-center p-6 border-b
        ${theme === "light" ? "border-[#DDDDDD]" : "border-gray-700"}
      `}>
              <h2 className={`text-[18px] font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                Add to cart
              </h2>
              <button onClick={() => setShowPanel(false)}>
                <IoMdClose className={`text-[24px] cursor-pointer hover:text-black duration-150 ${theme === "light" ? "text-[#9f9c9c]" : "text-gray-400"}`} />
              </button>
            </div>

            <div className="p-6">
              <img
                src={productImage}
                alt={pro.name}
                className="w-full h-[300px] object-cover mb-4"
              />

              <h3 className={`text-[16px] font-semibold mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                {pro.name}
              </h3>

              {currentSize && (
                <div className="flex gap-3 items-center mb-4">
                  {currentSize.oldPrice && (
                    <span className={`line-through text-[14px] ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}>
                      {currentSize.oldPrice} €
                    </span>
                  )}
                  <span className={`font-semibold text-[18px] ${theme === "light" ? "text-black" : "text-white"}`}>
                    {currentSize.price} €
                  </span>
                </div>
              )}

              {hasVariants && (
                <div className="mb-4">
                  <p className={`text-[14px] font-medium mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                    Color: {pro.variants[selectedColor].color.toUpperCase()}
                  </p>
                  <div className="flex gap-[8px]">
                    {pro.variants.map((v, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedColor(i)}
                        className={`w-8 h-8 rounded-full cursor-pointer border-1 ${selectedColor === i
                            ? `${theme === "light" ? "border-black" : "border-white"} scale-110`
                            : `${theme === "light" ? "border-gray-300" : "border-gray-600"}`
                          }`}
                        style={{ backgroundColor: v.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {hasSizes && (
                <div className="mb-6">
                  <h3 className={`font-semibold mb-3 text-[14px] ${theme === "light" ? "text-black" : "text-white"}`}>
                    Size
                  </h3>
                  <ul className="space-y-2">
                    {pro.sizes.map((s, i) => (
                      <li
                        key={i}
                        onClick={() => setSelectedSize(i)}
                        className={`p-3 border rounded cursor-pointer transition ${selectedSize === i
                            ? `${theme === "light" ? "border-black bg-gray-50" : "border-white"}`
                            : `${theme === "light" ? "border-gray-200 hover:border-gray-400" : "border-gray-700 hover:border-gray-500"}`
                          }`}
                      >
                        <div className="flex justify-between">
                          <div>
                            <strong className={`text-[14px] ${theme === "light" ? "text-black" : "text-white"}`}>
                              {s.type}
                            </strong>
                            <span className={`ml-2 text-[12px] ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                              {s.dimensions}
                            </span>
                          </div>
                          <div className="text-[14px]">
                            {s.oldPrice && (
                              <span className={`line-through mr-2 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}>
                                {s.oldPrice} €
                              </span>
                            )}
                            <strong className={theme === "light" ? "text-black" : "text-white"}>
                              {s.price} €
                            </strong>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={confirmAddToCart}
                className={`w-full cursor-pointer py-3 text-[14px] transition font-medium
            ${theme === "light"
                    ? "bg-[#e5e5e5] text-black hover:bg-black hover:text-white"
                    : "bg-gray-800 text-white hover:bg-white hover:text-black"
                  }
          `}
              >
                Add to cart
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Products;