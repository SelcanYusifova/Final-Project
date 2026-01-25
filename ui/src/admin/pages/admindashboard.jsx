import React from 'react'

function Admindashboard() {
  return (
    <div clas>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm uppercase">Total Products</h3>
          <p className="text-3xl font-bold mt-2">1,234</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm uppercase">Categories</h3>
          <p className="text-3xl font-bold mt-2">8</p>
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

export default Admindashboard
