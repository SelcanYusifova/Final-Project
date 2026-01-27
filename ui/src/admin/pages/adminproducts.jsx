import React, { useState } from "react";
import Swal from "sweetalert2";
import { useProductOperations } from "../components/useproductoperations";

function AdminProducts({ pro, category, subcategory, onDelete, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteProduct } = useProductOperations();

  const productImage =
    Array.isArray(pro.variants) && pro.variants.length > 0
      ? pro.variants[0].image
      : pro.image;

  const productPrice =
    Array.isArray(pro.sizes) && pro.sizes.length > 0
      ? pro.sizes[0].price
      : pro.price;

  const handleEdit = () => {
    if (onEdit) {
      onEdit(pro);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      html: `Do you want to delete <strong>"${pro.name?.en || pro.title}"</strong>?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        await deleteProduct(pro.id, category, subcategory, onDelete);
        setIsDeleting(false);
      }
    });
  };

  return (
    <div
      id={`product-${pro.id}`}
      className="group p-4 border border-gray-200 relative hover:shadow-lg hover:border-gray-300 transition-all duration-300 bg-white"
    >
      <div className="overflow-hidden mb-4">
        <img
          src={productImage}
          alt={pro.name?.en || "Product"}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h3 className="text-base font-semibold mb-2 text-gray-900 line-clamp-2">
        {pro.name?.en || pro.title}
      </h3>

      <p className="text-lg font-bold text-gray-900 mb-4">
        €{productPrice}
      </p>

      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          disabled={isDeleting}
          className="cursor-pointer flex-1 py-2.5 text-sm font-medium bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200 disabled:opacity-50"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="cursor-pointer flex-1 py-2.5 text-sm font-medium bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AdminProducts;