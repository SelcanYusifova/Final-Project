import React, { useEffect, useState } from "react";
import AdminProducts from "../adminproducts";

function  Decorativeaccessoriesadmin() {
  const [data, setData] = useState([]);

  // ✅ İlk yüklənmə
  const fetchData = () => {
    fetch("http://localhost:3000/allProducts")
      .then((res) => res.json())
      .then((allProducts) => {
        const homedecorCategory = allProducts.find(
          (cat) => cat.categoryId === "home-decor"
        );

        if (homedecorCategory && homedecorCategory.products.decorativeaccessories) {
          setData(homedecorCategory.products.decorativeaccessories);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();

    // ✅ productAdded event-ini dinlə
    const handleProductAdded = (event) => {
      const { newProduct, mappedSubcategory } = event.detail;
      
      if (mappedSubcategory === "decorative-accessories") {
        setData(prevData => {
          const updated = [...prevData, newProduct];
          
          // Yeni məhsula scroll et
          setTimeout(() => {
            const element = document.getElementById(`product-${newProduct.id}`);
            if (element) {
              element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
            }
          }, 100);
          
          return updated;
        });
      }
    };

    window.addEventListener('productAdded', handleProductAdded);
    
    return () => {
      window.removeEventListener('productAdded', handleProductAdded);
    };
  }, []);

  // ✅ Delete funksiyası - loader YOX, dərhal state-dən sil
  const handleDelete = (productId) => {
    setData(prevData => prevData.filter(p => p.id !== productId));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Home Decor - Decorative Accessories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((product) => (
          <AdminProducts
            key={product.id}
            pro={product}
            category="home-decor"
            subcategory="decorative-accessories"
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default  Decorativeaccessoriesadmin;
   

 
 
 
  
 
 

