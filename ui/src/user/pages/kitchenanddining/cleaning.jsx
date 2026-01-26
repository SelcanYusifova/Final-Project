import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FullScreenLoader from "../../components/fullScreenLoader";
import Products from "../../components/products";

function Cleaning({ priceRange }) {
  const { colSize, setColSize, theme  } = useOutletContext(); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
    const filteredData = data.filter((item) => {
    const price = item.price ?? item.sizes?.[0]?.price;
    return price >= priceRange[0] && price <= priceRange[1];
  });

  useEffect(() => {
    fetch("http://localhost:3000/allProducts")
      .then((res) => res.json())
      .then((allProducts) => {
        const kitchenCategory = allProducts.find(
          (cat) => cat.categoryId === "kitchen-and-dining"
        );

        if (
          kitchenCategory &&
          kitchenCategory.products.cleaning
        ) {
          setTimeout(() => {
            setData(kitchenCategory.products.cleaning);
            setLoading(false);
          }, 1000);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <FullScreenLoader />;

  return (
   <div className="row px-4 mt-[240px] content">
      {filteredData.map((e) => (
        <Products key={e.id} pro={e} colSize={colSize} theme={theme}  />
      ))}
    </div>
  );
}

export default Cleaning;
