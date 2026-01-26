import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function AdminSearchModal({ isOpen, onClose }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // ✅ Price format funksiyası
  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    return Number.isFinite(numPrice) ? numPrice.toFixed(2) : "0.00";
  };

  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:3000/allProducts")
        .then((res) => res.json())
        .then((data) => {
          const allProducts = data.flatMap((cat) => 
            Object.entries(cat.products).flatMap(([subcategory, prods]) =>
              prods.map(product => ({
                ...product,
                categoryId: cat.categoryId,
                subcategory: subcategory
              }))
            )
          );
          setProducts(allProducts);
        })
        .catch(console.error);
    }
  }, [isOpen]);

  const deleteProduct = async (productToDelete) => {
    setIsDeleting(true);
    
    try {
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      
      const res = await fetch("http://localhost:3000/allProducts");
      const allProducts = await res.json();

      const categoryData = allProducts.find(c => c.categoryId === productToDelete.categoryId);
      
      if (categoryData && categoryData.products[productToDelete.subcategory]) {
        categoryData.products[productToDelete.subcategory] = 
          categoryData.products[productToDelete.subcategory].filter(p => p.id !== productToDelete.id);
        
        await fetch(`http://localhost:3000/allProducts/${categoryData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData)
        });
      }

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Product deleted successfully.",
        timer: 1500,
        showConfirmButton: false
      });

    } catch (error) {
      console.error(error);
      setProducts(prev => [...prev, productToDelete]);
      Swal.fire("Error", "Failed to delete!", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    
    Swal.fire({
      title: "Are you sure?",
      html: `Delete <strong>"${product.name?.en || product.title}"</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        const popup = Swal.getPopup();
        popup.style.zIndex = '1000000';
        popup.closest('.swal2-container')?.style.setProperty('z-index', '1000000', 'important');
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product);
      }
    });
  };

  const handleEdit = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Edit product:", product);
    onClose();
  };

  const filtered = products.filter((p) =>
    p.name?.en?.toLowerCase().includes(search.toLowerCase()) ||
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.name?.az?.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-6xl max-h-[95vh] rounded-2xl shadow-2xl overflow-hidden relative"
        style={{ zIndex: 100000 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Search Products ({filtered.length})
            </h2>
            <button
              onClick={onClose}
              className="cursor-pointer p-2 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name..."
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-lg font-medium transition-all duration-200"
          />
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {search ? (
            filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.slice(0, 16).map((p) => {
                  const productImage = Array.isArray(p.variants) && p.variants.length > 0 
                    ? p.variants[0].image 
                    : p.image;
                  
                  const productPrice = Array.isArray(p.sizes) && p.sizes.length > 0 
                    ? p.sizes[0].price 
                    : p.price;

                  return (
                    <div
                      key={p.id}
                      id={`product-${p.id}`}
                      className="group p-4 border border-gray-200 relative rounded-lg hover:shadow-lg hover:border-gray-300 transition-all duration-300 bg-white"
                    >
                      <button
                        onClick={(e) => handleDelete(e, p)}
                        disabled={isDeleting}
                        className="cursor-pointer absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all duration-200 flex items-center justify-center z-[100]"
                        title="Delete product"
                      >
                        {isDeleting ? (
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          "×"
                        )}
                      </button>

                      <div className="overflow-hidden rounded-lg mb-4">
                        <img
                          src={productImage}
                          alt={p.name?.en || p.title}
                          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>

                      <h3 className="text-base font-semibold mb-2 text-gray-900 line-clamp-2 leading-tight">
                        {p.name?.en || p.title || p.name?.az}
                      </h3>

                      <p className="text-lg font-bold text-gray-900 mb-6">
                        €{formatPrice(productPrice)}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleEdit(e, p)}
                          disabled={isDeleting}
                          className="cursor-pointer flex-1 py-2.5 px-3 text-sm font-medium bg-blue-100 text-blue-900 rounded-lg hover:bg-black hover:text-white transition-all duration-200 disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, p)}
                          disabled={isDeleting}
                          className="cursor-pointer flex-1 py-2.5 px-3 text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-6 opacity-30">🔍</div>
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No products found</h3>
              </div>
            )
          ) : (
            <div className="text-center py-20">
              <div className="text-7xl mb-6 opacity-40">📦</div>
              <h3 className="text-2xl font-bold text-gray-400 mb-3">Start searching</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSearchModal;
