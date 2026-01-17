import React from "react";
import { useParams } from "react-router-dom";
import { subcategoryComponentsMap } from "../../map/subcategoryMap";

const SubcategoryPage = () => {
  const { categorySlug, subcategorySlug } = useParams();

  const categoryMap = subcategoryComponentsMap[categorySlug];

  if (!categoryMap) {
    return <div>Category tapılmadı</div>;
  }

  const SubcategoryComponent = categoryMap[subcategorySlug];

  if (!SubcategoryComponent) {
    return <div>Subcategory tapılmadı</div>;
  }

  return <SubcategoryComponent />;
};

export default SubcategoryPage;
