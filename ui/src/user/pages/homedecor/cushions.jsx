import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FullScreenLoader from "../../components/fullScreenLoader";
import Products from "../../components/products";

function Cushions() {
  const { colSize, setColSize } = useOutletContext(); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/allProducts")
      .then((res) => res.json())
      .then((allProducts) => {
        const homedecorCategory = allProducts.find(
          (cat) => cat.categoryId === "home-decor"
        );

        if (
          homedecorCategory &&
          homedecorCategory.products.cushions
        ) {
          setTimeout(() => {
            setData(homedecorCategory.products.cushions);
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
      {data.map((e) => (
        <Products key={e.id} pro={e} colSize={colSize} />
      ))}
    </div>
  );
}

export default Cushions;
