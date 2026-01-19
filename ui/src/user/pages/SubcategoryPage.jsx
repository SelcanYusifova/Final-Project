import React from "react";
import { useParams } from "react-router-dom";
import { subcategoryComponentsMap } from "../../map/subcategoryMap";
import { useOutletContext } from "react-router-dom";

const SubcategoryPage = () => {
  const { categorySlug, subcategorySlug } = useParams();

  const { priceRange } = useOutletContext();

  const categoryMap = subcategoryComponentsMap[categorySlug];

  if (!categoryMap) {
    return <div>Category tapılmadı</div>;
  }

  const SubcategoryComponent = categoryMap[subcategorySlug];

  if (!SubcategoryComponent) {
    return <div>Subcategory tapılmadı</div>;
  }

  return <SubcategoryComponent priceRange={priceRange} />;
};

export default SubcategoryPage;
