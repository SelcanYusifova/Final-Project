
// ============================================
// 1. AdminLayout.jsx - src/admin/layout/AdminLayout.jsx
// ============================================
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

function AdminLayout() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/').filter(Boolean);
  const categorySlug = pathParts[1];
  const subcategorySlug = pathParts[2];

  const currentCategory = categories.find(c => c.slug === categorySlug);
  const showSecondaryNavbar = categorySlug && subcategorySlug;

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  const toggleCategory = (slug) => {
    setActiveCategory(activeCategory === slug ? null : slug);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* AdminSidebar */}
      <div className="w-64 bg-black text-white min-h-screen flex flex-col fixed left-0 top-0 z-50">
        <div 
          className="p-6 text-2xl font-bold border-b border-gray-700 cursor-pointer"
          onClick={() => navigate('/admin')}
        >
          LUMERA
        </div>

        <div className="flex-1 overflow-y-auto">
          {categories.map(cat => (
            <div key={cat.slug}>
              <div
                className="px-6 py-3 cursor-pointer flex justify-between items-center hover:bg-gray-800 transition"
                onClick={() => toggleCategory(cat.slug)}
              >
                <span className="uppercase text-sm">{cat.title.en}</span>
                <span className="text-lg">{activeCategory === cat.slug ? "−" : "+"}</span>
              </div>

              {activeCategory === cat.slug && cat.subcategories && (
                <div className="bg-gray-900">
                  {cat.subcategories.map(sub => (
                    <div
                      key={sub.slug}
                      className="pl-10 py-2 cursor-pointer hover:text-gray-300 text-sm transition"
                      onClick={() => navigate(`/admin/${cat.slug}/${sub.slug}`)}
                    >
                      {sub.title.en}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sağ tərəf */}
      <div className="flex-1 flex flex-col ml-64">
        {/* AdminNavbar */}
        <header className="h-[70px] bg-white flex items-center justify-between px-8 shadow-sm border-b">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          
          <div className="flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Add Product
          </button>
        </header>

        {/* AdminSecondaryNavbar */}
        {showSecondaryNavbar && currentCategory && (
          <nav className="bg-gray-50 border-b border-gray-200 px-8">
            <div className="py-3 text-xs text-gray-500">
              {currentCategory.title.en}
              {subcategorySlug && (
                <>
                  {" > "}
                  {currentCategory.subcategories.find(sub => sub.slug === subcategorySlug)?.title.en}
                </>
              )}
            </div>

            <div className="pb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              <ul className="flex gap-8 text-sm uppercase tracking-wide whitespace-nowrap">
                {currentCategory.subcategories.map((sub) => (
                  <li key={sub.slug} className="cursor-pointer pb-1">
                    <div
                      onClick={() => navigate(`/admin/${currentCategory.slug}/${sub.slug}`)}
                      className={`block transition-colors ${
                        sub.slug === subcategorySlug
                          ? "text-black border-b-2 border-black font-semibold"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      {sub.title.en}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        {/* Məzmun */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
