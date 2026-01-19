import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FullScreenLoader from "../../components/fullScreenLoader";
import Products from "../../components/products";

function Pets({ priceRange }) {
  const { colSize, setColSize } = useOutletContext(); 
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
        const petscollectionCategory = allProducts.find(
          (cat) => cat.categoryId === "pets-collection"
        );

        if (
          petscollectionCategory &&
          petscollectionCategory.products.pets
        ) {
          setTimeout(() => {
            setData(petscollectionCategory.products.pets);
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
   <div className="row px-4 mt-[240px]">
      {filteredData.map((e) => (
        <Products key={e.id} pro={e} colSize={colSize} />
      ))}
    </div>
  );
}

export default Pets;
