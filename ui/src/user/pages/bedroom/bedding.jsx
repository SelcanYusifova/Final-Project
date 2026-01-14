import React, { useEffect, useState } from "react";
import Beddingproducts from "../../components/beddingProducts";
import FullScreenLoader from "../../components/fullScreenLoader";
import SecondaryNavbar from "../../components/secondaryNavbar";

function Bedding() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [colSize, setColSize] = useState(3); // default 4 məhsul

  useEffect(() => {
    fetch("http://localhost:3000/bedroombedding")
      .then((res) => res.json())
      .then((pro) => {
        setTimeout(() => {
          setData(pro);
          setLoading(false);
        }, 1000);
      });
  }, []);

  if (loading) return <FullScreenLoader />;

  return (
    <>
      <SecondaryNavbar colSize={colSize} setColSize={setColSize} />

      <div className="row px-4 mt-[240px]">
        {data.map((e) => (
          <Beddingproducts key={e.id} pro={e} colSize={colSize} />
        ))}
      </div>
    </>
  );
}

export default Bedding;
