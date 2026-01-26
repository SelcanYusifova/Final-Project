import React, { useEffect, useState } from "react";
import AdminProducts from "../adminproducts";

function Kitchenaccessoriesadmin () {
  const [data, setData] = useState([]);

  // ✅ İlk yüklənmə
  const fetchData = () => {
    fetch("http://localhost:3000/allProducts")
      .then((res) => res.json())
      .then((allProducts) => {
        const kitchenCategory = allProducts.find(
          (cat) => cat.categoryId === "kitchen-and-dining"
        );

        if (kitchenCategory && kitchenCategory.products.kitchenaccessories) {
          setData(kitchenCategory.products.kitchenaccessories);
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

      if (mappedSubcategory === "kitchen-accessories") {
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
      <h2 className="text-2xl font-bold mb-6">Kitchen and dining - Kitchen accessories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((product) => (
          <AdminProducts
            key={product.id}
            pro={product}
            category="kitchen"
            subcategory="kitchenaccessories"
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Kitchenaccessoriesadmin;







 






 







 






 





 
 
