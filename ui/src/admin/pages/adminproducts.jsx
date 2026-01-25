import React from "react";

function AdminProducts({ pro }) {
  const productImage =
    Array.isArray(pro.variants) && pro.variants.length > 0
      ? pro.variants[0].image
      : pro.image;

  const productPrice =
    Array.isArray(pro.sizes) && pro.sizes.length > 0
      ? pro.sizes[0].price
      : pro.price;

  const handleEdit = () => {
    console.log("Edit product:", pro.id);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${pro.name.en}?`)) {
      console.log("Delete product:", pro.id);
    }
  };

  return (
    <div className="p-4 border border-[#dddddd]">
      <img
        src={productImage}
        alt={pro.name.en}
        className="w-full h-48 object-cover  mb-3"
      />

      <h3 className="text-[14px] font-medium mb-1">{pro.name.en}</h3>
      <p className="text-[14px] text-gray-700 mb-4">{productPrice} €</p>

      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="
            flex-1 py-3 text-[14px] font-medium transition
            bg-[#e5e5e5] text-black
            hover:bg-black hover:text-white
          "
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="
            flex-1 py-3 text-[14px] font-medium transition
            bg-[#e5e5e5] text-black
            hover:bg-red-600 hover:text-white
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AdminProducts;
