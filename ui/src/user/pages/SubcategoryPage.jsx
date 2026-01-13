// src/pages/SubcategoryPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { subcategoryComponentsMap } from "../../map/subcategoryMap";

const SubcategoryPage = () => {
  const { categorySlug, subcategorySlug } = useParams();

  // category map-i tap
  const categoryMap = subcategoryComponentsMap[categorySlug];

  // əgər category yoxdursa
  if (!categoryMap) {
    return <div>Category tapılmadı</div>;
  }

  // subcategory component-i tap
  const SubcategoryComponent = categoryMap[subcategorySlug];

  // əgər subcategory yoxdursa
  if (!SubcategoryComponent) {
    return <div>Subcategory tapılmadı</div>;
  }

  // tapılan component-i render et
  return <SubcategoryComponent />;
};

export default SubcategoryPage;
