import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    // Categories fetch
    fetch('http://localhost:3000/categories')
      .then(res => res.json())
      .then(data => setTotalCategories(data.length))
      .catch(console.error);

    // All Products fetch
    fetch('http://localhost:3000/allProducts')
      .then(res => res.json())
      .then(data => {
        let count = 0;
        data.forEach(category => {
          const productsObj = category.products;
          Object.values(productsObj).forEach(subArray => {
            count += subArray.length;
          });
        });
        setTotalProducts(count);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="pt-[64px]">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm uppercase">Total Products</h3>
          <p className="text-3xl font-bold mt-2">{totalProducts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm uppercase">Categories</h3>
          <p className="text-3xl font-bold mt-2">{totalCategories}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm uppercase">Total Sales</h3>
          <p className="text-3xl font-bold mt-2">$45,678</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Welcome to Admin Panel</h2>
        <p className="text-gray-600">
          Select a category from the sidebar to manage products.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
