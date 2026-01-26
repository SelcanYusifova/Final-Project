import React, { useEffect, useState } from "react";
import AdminProducts from "../adminproducts";

function Petsadmin () {
  const [data, setData] = useState([]);

  // ✅ İlk yüklənmə
  const fetchData = () => {
    fetch("http://localhost:3000/allProducts")
      .then((res) => res.json())
      .then((allProducts) => {
        const petsCategory = allProducts.find(
          (cat) => cat.categoryId === "pets-collection"
        );

        if (petsCategory && petsCategory.products.pets) {
          setData(petsCategory.products.pets);
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

      if (mappedSubcategory === "pets") {
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
      <h2 className="text-2xl font-bold mb-6">Pets collection - Pets</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((product) => (
          <AdminProducts
            key={product.id}
            pro={product}
            category="pets-collection"
            subcategory="pets"
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Petsadmin;







 
 

 





 
 

