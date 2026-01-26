import React, { useEffect, useState, useRef, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./adminsidebar";
import AdminHeader from "./adminheader";
import AdminSecondaryNavbar from "./adminsecondarynavbar";
import AddProductPanel from "../components/addproductpopup";

function AdminLayout() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const outletRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const categorySlug = pathParts[1];
  const subcategorySlug = pathParts[2];

  const currentCategory = categories.find(c => c.slug === categorySlug);
  const showSecondaryNavbar = categorySlug && subcategorySlug;

  // ✅ Categories fetch
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error);
  }, []);

  // ✅ Category toggle
  const toggleCategory = useCallback((slug) => {
    setActiveCategory(prev => (prev === slug ? null : slug));
  }, []);

  // ✅ Product added handler - memoize et
  const handleProductAdded = useCallback((newProduct, mappedSubcategory) => {
    window.dispatchEvent(
      new CustomEvent('productAdded', {
        detail: { newProduct, mappedSubcategory }
      })
    );
  }, []);

  // ✅ Scroll to top on location change
  useEffect(() => {
    outletRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categorySlug, subcategorySlug]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Sidebar */}
      <AdminSidebar
        categories={categories}
        activeCategory={activeCategory}
        onToggle={toggleCategory}
        onNavigate={navigate}
      />

      {/* ✅ Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        <AdminHeader onOpenModal={() => setIsAddPanelOpen(true)} />

        {/* ✅ Secondary Navbar */}
        {showSecondaryNavbar && currentCategory && (
          <AdminSecondaryNavbar
            category={currentCategory}
            activeSubcategory={subcategorySlug}
            onNavigate={navigate}
          />
        )}

        {/* ✅ Content Area */}
        <div className="flex-1 p-8 overflow-y-auto" ref={outletRef}>
          <Outlet context={{
            categories,
            currentCategory,
            categorySlug,
            subcategorySlug
          }} />
        </div>
      </div>

      {/* ✅ Add Product Panel */}
      <AddProductPanel
        isOpen={isAddPanelOpen}
        onClose={() => setIsAddPanelOpen(false)}
        onProductAdded={handleProductAdded}
      />
      
    </div>
  );
}

export default AdminLayout;
