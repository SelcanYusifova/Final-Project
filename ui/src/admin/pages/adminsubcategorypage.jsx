import React from "react";
import { useParams } from "react-router-dom";
import { adminSubcategoryComponentsMap } from "../../map/adminsubcategoryMap";

const AdminSubcategoryPage = () => {
  const { categorySlug, subcategorySlug } = useParams();

  const categoryMap = adminSubcategoryComponentsMap[categorySlug];

  if (!categoryMap) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Category tapılmadı</div>
      </div>
    );
  }

  const SubcategoryComponent = categoryMap[subcategorySlug];

  if (!SubcategoryComponent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Subcategory tapılmadı</div>
      </div>
    );
  }

  return <SubcategoryComponent />;
};

export default AdminSubcategoryPage;