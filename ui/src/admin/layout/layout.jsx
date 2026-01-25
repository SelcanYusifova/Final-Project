import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./adminsidebar";
import AdminHeader from "./adminheader";
import AdminSecondaryNavbar from "./adminsecondarynavbar";

function AdminLayout() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const categorySlug = pathParts[1];
  const subcategorySlug = pathParts[2];

  const currentCategory = categories.find(c => c.slug === categorySlug);
  const showSecondaryNavbar = categorySlug && subcategorySlug;

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error);
  }, []);

  const toggleCategory = slug => {
    setActiveCategory(prev => (prev === slug ? null : slug));
  };

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar
        categories={categories}
        activeCategory={activeCategory}
        onToggle={toggleCategory}
        onNavigate={navigate}
      />

      <div className="flex-1 ml-64 flex flex-col">
        <AdminHeader />

        {showSecondaryNavbar && currentCategory && (
          <AdminSecondaryNavbar
            category={currentCategory}
            activeSubcategory={subcategorySlug}
            onNavigate={navigate}
          />
        )}

        {/* CONTENT */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
