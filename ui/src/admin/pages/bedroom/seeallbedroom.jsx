import React, { useEffect, useState } from 'react'
import AdminProducts from '../../adminproduct';

function Seealladmin() {
const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/allProducts")
      .then((res) => res.json())
      .then((allProducts) => {
        const bedroomCategory = allProducts.find(
          (cat) => cat.categoryId === "bedroom"
        );

        if (bedroomCategory && bedroomCategory.products.bedroomduvetcovers) {
          setTimeout(() => {
            setData(bedroomCategory.products.bedroomduvetcovers);
            setLoading(false);
          }, 500);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Bedroom - Bedding</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((product) => (
          <AdminProducts key={product.id} pro={product} />
        ))}
      </div>
    </div>
  );
}

export default Seealladmin
