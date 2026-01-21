import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { Bounce, toast } from "react-toastify";
import FullScreenLoader from "../components/fullScreenLoader";

function ProductDetail() {
  const { id } = useParams();
  const { theme } = useOutletContext();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [showPanel, setShowPanel] = useState(false);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetch("http://localhost:3000/allProducts")
      .then(res => res.json())
      .then(data => {
        const found = data
          .flatMap(cat =>
            Object.values(cat.products).flat().map(p => ({
              ...p,
              categoryName: cat.categoryName
            }))
          )
          .find(p => String(p.id) === String(id));

        setProduct(found || null);
        setSelectedColor(0);
        setSelectedSize(0);
      })
      .catch(console.error);
  }, [id]);

  const handleAddToCart = () => {
    if (!userId) {
      toast.error('Sign in to add products to cart!', {
        position: "top-center",
        autoClose: 3000,
        theme: theme === "dark" ? "dark" : "light",
        transition: Bounce,
      });
      return;
    }

    setShowPanel(true);
  };

  const confirmAddToCart = async () => {
    const cartItem = {
      userId: userId,
      productId: product.id,
      name: product.name,
      image: imageSrc,
      color: hasVariants ? product.variants[selectedColor].color : null,
      colorHex: hasVariants ? product.variants[selectedColor].hex : null,
      size: currentSize ? currentSize.type : null,
      price: currentSize ? currentSize.price : product.price,
      oldPrice: currentSize ? currentSize.oldPrice : product.oldPrice,
      quantity: 1
    };

    const res = await fetch("http://localhost:3000/basket");
    const data = await res.json();

    const existingItem = data.find(item =>
      item.userId === userId &&
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
      theme: theme === "dark" ? "dark" : "light",
      transition: Bounce,
    });

    setShowPanel(false);
  };

  if (!product) {
    return <FullScreenLoader />;
  }

  const hasVariants = product.variants?.length > 0;
  const hasSizes = product.sizes?.length > 0;

  const imageSrc = hasVariants
    ? product.variants[selectedColor]?.image
    : product.image || "/placeholder.jpg";

  const currentSize = hasSizes ? product.sizes[selectedSize] : null;

  return (
    <>
      <div className={`max-w-7xl mx-auto px-6 py-10 flex lg:flex-row gap-10 mt-[150px] detail
        ${theme === "light" ? "text-black" : "text-white"}`}>

        <div className="flex gap-4">
          {hasVariants && (
            <div className="flex flex-col gap-4">
              {product.variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={`w-16 h-16 border-1 cursor-pointer transition-colors ${
                    selectedColor === i 
                      ? theme === "light" 
                        ? "border-black p-[4px]" 
                        : "border-white p-[4px]"
                      : theme === "light"
                        ? "border-gray-300"
                        : "border-gray-600"
                  }`}
                >
                  <img
                    src={v.image}
                    alt={v.color}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] img">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <nav className={`text-[14px]
            ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
            {product.categoryName?.toUpperCase()}
          </nav>

          <h1 className="text-[20px] font-semibold uppercase">{product.name}</h1>

          {currentSize && (
            <div className="flex gap-3 items-center">
              {currentSize.oldPrice && (
                <span className={`line-through
                  ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}>
                  {currentSize.oldPrice} €
                </span>
              )}
              <span className="font-semibold">{currentSize.price} €</span>
            </div>
          )}

          {hasVariants && (
            <>
              <p className="text-[14px] font-medium">
                {product.variants[selectedColor]?.color?.toUpperCase()} | {product.code}
              </p>

              <div className="flex gap-3">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-6 h-6 rounded-full border-1 cursor-pointer transition ${
                      selectedColor === i
                        ? theme === "light"
                          ? "border-black scale-110"
                          : "border-white scale-110"
                        : theme === "light"
                          ? "border-gray-300"
                          : "border-gray-600"
                    }`}
                    style={{ backgroundColor: v.hex }}
                  />
                ))}
              </div>
            </>
          )}

          <p className={`text-[14px] max-w-lg
            ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            {product.description || "No description available."}
          </p>

          {hasSizes && (
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <ul className="space-y-3">
                {product.sizes.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => setSelectedSize(i)}
                    className={`p-3 border rounded flex justify-between cursor-pointer transition ${
                      selectedSize === i
                        ? theme === "light"
                          ? "border-black bg-gray-50"
                          : "border-white bg-black"
                        : theme === "light"
                          ? "border-gray-200"
                          : "border-gray-700"
                    }`}
                  >
                    <div>
                      <strong>{s.type}</strong>
                      <span className={`ml-2 text-[12px]
                        ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                        {s.dimensions}
                      </span>
                    </div>
                    <div>
                      {s.oldPrice && (
                        <span className={`line-through mr-2
                          ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}>
                          {s.oldPrice} €
                        </span>
                      )}
                      <strong>{s.price} €</strong>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button 
            onClick={handleAddToCart}
            className={`w-full cursor-pointer py-3 transition
              ${theme === "light"
                ? "bg-[#e5e5e5] hover:bg-black hover:text-white"
                : "bg-gray-700 hover:bg-white hover:text-black"}`}
          >
            Add to cart
          </button>
        </div>
      </div>

      {showPanel && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowPanel(false)}
          />

          <div className={`fixed right-0 top-0 h-full w-[450px] z-50 shadow-2xl overflow-y-auto panel transition-colors
            ${theme === "light" ? "bg-white" : "bg-black"}`}>

            <div className={`flex justify-between items-center p-6 border-b
              ${theme === "light" ? "border-[#DDDDDD]" : "border-gray-700"}`}>
              <h2 className="text-[18px] font-semibold">Add to cart</h2>
              <button onClick={() => setShowPanel(false)}>
                <IoMdClose className={`text-[24px] cursor-pointer hover:text-gray-700 duration-150
                  ${theme === "light" ? "text-[#9f9c9c]" : "text-gray-400"}`} />
              </button>
            </div>

            <div className="p-6">
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-[300px] object-cover mb-4"
              />

              <h3 className="text-[16px] font-semibold mb-2">{product.name}</h3>

              {currentSize && (
                <div className="flex gap-3 items-center mb-4">
                  {currentSize.oldPrice && (
                    <span className={`line-through text-[14px]
                      ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}>
                      {currentSize.oldPrice} €
                    </span>
                  )}
                  <span className="font-semibold text-[18px]">{currentSize.price} €</span>
                </div>
              )}

              {hasVariants && (
                <div className="mb-4">
                  <p className="text-[14px] font-medium mb-2">
                    Color: {product.variants[selectedColor].color.toUpperCase()}
                  </p>
                  <div className="flex gap-[8px]">
                    {product.variants.map((v, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedColor(i)}
                        className={`w-8 h-8 rounded-full cursor-pointer border-1 transition ${
                          selectedColor === i 
                            ? theme === "light"
                              ? 'border-black scale-110' 
                              : 'border-white scale-110'
                            : theme === "light"
                              ? 'border-gray-300'
                              : 'border-gray-600'
                        }`}
                        style={{ backgroundColor: v.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {hasSizes && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-[14px]">Size</h3>
                  <ul className="space-y-2">
                    {product.sizes.map((s, i) => (
                      <li
                        key={i}
                        onClick={() => setSelectedSize(i)}
                        className={`p-3 border rounded cursor-pointer transition ${
                          selectedSize === i
                            ? theme === "light"
                              ? 'border-black bg-gray-50'
                              : 'border-white bg-black'
                            : theme === "light"
                              ? 'border-gray-200 hover:border-gray-400'
                              : 'border-gray-700 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex justify-between">
                          <div>
                            <strong className="text-[14px]">{s.type}</strong>
                            <span className={`ml-2 text-[12px]
                              ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                              {s.dimensions}
                            </span>
                          </div>
                          <div className="text-[14px]">
                            {s.oldPrice && (
                              <span className={`line-through mr-2
                                ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}>
                                {s.oldPrice} €
                              </span>
                            )}
                            <strong>{s.price} €</strong>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={confirmAddToCart}
                className={`w-full cursor-pointer py-3 text-[14px] font-medium transition
                  ${theme === "light"
                    ? "bg-[#e5e5e5] hover:bg-black hover:text-white"
                    : "bg-gray-700 hover:bg-white hover:text-black"}`}
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

export default ProductDetail;