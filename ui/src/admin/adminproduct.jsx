// 2. AdminProducts.jsx - src/admin/components/AdminProducts.jsx
// ============================================
import React from "react";

function AdminProducts({ pro }) {
  const productImage = Array.isArray(pro.variants) && pro.variants.length > 0
    ? pro.variants[0].image
    : pro.image;

  const productPrice = Array.isArray(pro.sizes) && pro.sizes.length > 0
    ? pro.sizes[0].price
    : pro.price;

  const handleEdit = () => {
    console.log("Edit product:", pro.id);
    // Modal aç və ya edit səhifəsinə yönləndir
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${pro.name.en}?`)) {
      // DELETE request
      console.log("Delete product:", pro.id);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <img
        src={productImage}
        alt={pro.name.en}
        className="w-full h-48 object-cover rounded mb-3"
      />

      <h3 className="text-sm font-semibold mb-1">{pro.name.en}</h3>
      <p className="text-gray-700 mb-3">${productPrice}</p>

      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition text-sm"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AdminProducts;