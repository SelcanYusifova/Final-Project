import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FullScreenLoader from "../components/fullScreenLoader";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

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
    <div className="max-w-7xl mx-auto px-6 py-10 flex lg:flex-row gap-10 mt-[150px]">

      <div className="flex gap-4">
        {hasVariants && (
          <div className="flex flex-col gap-4">
            {product.variants.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(i)}
                className={`w-16 h-16 border-1 cursor-pointer  ${
                  selectedColor === i ? "border-black p-[4px]" : "border-gray-300"
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

        <div className="w-[400px] lg:w-[600px] h-[400px] lg:h-[600px]">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <nav className="text-gray-500 text-[14px]">
          {product.categoryName?.toUpperCase()}
        </nav>

        <h1 className="text-[20px] font-semibold uppercase">{product.name}</h1>

        {currentSize && (
          <div className="flex gap-3 items-center">
            {currentSize.oldPrice && (
              <span className="line-through text-gray-400">
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

            <div className="flex gap-3 ">
              {product.variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={`w-6 h-6 rounded-full border-1 cursor-pointer ${
                    selectedColor === i
                      ? "border-black scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: v.hex }}
                />
              ))}
            </div>
          </>
        )}

        <p className="text-[14px] text-gray-700 max-w-lg">
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
                  className={`p-3 border rounded flex justify-between cursor-pointer ${
                    selectedSize === i
                      ? "border-black bg-gray-50"
                      : "border-gray-200"
                  }`}
                >
                  <div>
                    <strong>{s.type}</strong>
                    <span className="ml-2 text-gray-500 text-[12px]">
                      {s.dimensions}
                    </span>
                  </div>
                  <div>
                    {s.oldPrice && (
                      <span className="line-through text-gray-400 mr-2">
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

        <button className="w-full bg-[#e5e5e5] py-3 hover:bg-black hover:text-white transition">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
