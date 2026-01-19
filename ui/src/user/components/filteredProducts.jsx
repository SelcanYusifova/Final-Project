import Products from "./products";
import { useOutletContext } from "react-router-dom";

function FilteredProducts({ data }) {
  const { colSize, priceRange } = useOutletContext();

  const filteredData = data.filter((item) => {
    const price = item.sizes?.[0]?.price || item.price;
    return price >= priceRange[0] && price <= priceRange[1];
  });

  return (
    <div className="row px-4 mt-[240px]">
      {filteredData.map((e) => (
        <Products key={e.id} pro={e} colSize={colSize} />
      ))}
    </div>
  );
}

export default FilteredProducts;
