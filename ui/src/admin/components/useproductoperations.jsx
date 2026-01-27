import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const subcategoryMap = {
    "duvet-covers": "bedroomduvetcovers",
    "bedspreads": "bedroombedspreads",
    "bedding": "bedroombedding",
    "quilts": "bedroomquilts",
    "cushion-and-throws": "bedroomcushionandthrows",
    "wardrobes-and-storage": "bedroomwardrobesandstorage",
    "see-all": "see-all"
};

export const useProductOperations = () => {
    const navigate = useNavigate();

    // ✅ ADD PRODUCT
    const addProduct = async (formData, selectedCategory, selectedSubcategory, onProductAdded) => {
        if (!selectedCategory || !selectedSubcategory) {
            Swal.fire("Error", "Select a category and subcategory", "error");
            return false;
        }

        if (!formData.name.en || formData.sizes.length === 0) {
            Swal.fire("Error", "Fill in the required fields", "error");
            return false;
        }

        try {
            const res = await fetch("http://localhost:3000/allProducts");
            const allProducts = await res.json();

            const categoryIndex = allProducts.findIndex(
                c => c.categoryId === selectedCategory
            );

            if (categoryIndex === -1) {
                Swal.fire("Error", "Category not found", "error");
                return false;
            }

            const mappedSubcategory = subcategoryMap[selectedSubcategory] || selectedSubcategory;

            const newProduct = {
                id: crypto.randomUUID().slice(0, 6),
                name: formData.name,
                image: formData.image,
                sizes: formData.sizes,
                variants: formData.variants.map((v, i) => ({
                    ...v,
                    image: v.image || (i === 0 ? formData.image : "")
                }))
            };

            const productsObj = allProducts[categoryIndex].products;

            if (!productsObj[mappedSubcategory]) {
                productsObj[mappedSubcategory] = [];
            }

            productsObj[mappedSubcategory].push(newProduct);

            await fetch(
                `http://localhost:3000/allProducts/${allProducts[categoryIndex].id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(allProducts[categoryIndex])
                }
            );

            if (onProductAdded) {
                onProductAdded(newProduct, mappedSubcategory);
            }

            const targetUrl = `/admin/${selectedCategory}/${selectedSubcategory}`;
            if (window.location.pathname !== targetUrl) {
                navigate(targetUrl);
            }

            Swal.fire({
                icon: "success",
                title: "Successful!",
                text: "Product added",
                timer: 1500,
                showConfirmButton: false
            });

            return true;
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to add product", "error");
            return false;
        }
    };

    // ✅ EDIT PRODUCT
    const editProduct = async (formData, selectedCategory, selectedSubcategory, editProduct, onProductUpdated) => {
        if (!selectedCategory || !selectedSubcategory) {
            Swal.fire("Error", "Select a category and subcategory", "error");
            return false;
        }

        if (!formData.name.en || formData.sizes.length === 0) {
            Swal.fire("Error", "Fill in the required fields", "error");
            return false;
        }

        try {
            const res = await fetch("http://localhost:3000/allProducts");
            const allProducts = await res.json();

            const categoryIndex = allProducts.findIndex(
                c => c.categoryId === selectedCategory
            );

            if (categoryIndex === -1) {
                Swal.fire("Error", "Category not found", "error");
                return false;
            }

            const mappedSubcategory = subcategoryMap[selectedSubcategory] || selectedSubcategory;

            const updatedProduct = {
                id: editProduct.id,
                name: formData.name,
                image: formData.image,
                sizes: formData.sizes,
                variants: formData.variants.map((v, i) => ({
                    ...v,
                    image: v.image || (i === 0 ? formData.image : "")
                }))
            };

            const productsObj = allProducts[categoryIndex].products;

            if (!productsObj[mappedSubcategory]) {
                productsObj[mappedSubcategory] = [];
            }

            const productIndex = productsObj[mappedSubcategory].findIndex(
                p => p.id === editProduct.id
            );

            if (productIndex !== -1) {
                productsObj[mappedSubcategory][productIndex] = updatedProduct;
            }

            await fetch(
                `http://localhost:3000/allProducts/${allProducts[categoryIndex].id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(allProducts[categoryIndex])
                }
            );

            if (onProductUpdated) {
                onProductUpdated(updatedProduct, mappedSubcategory);
            }

            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Product updated successfully",
                timer: 1500,
                showConfirmButton: false
            });

            return true;
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update product", "error");
            return false;
        }
    };

    // ✅ DELETE PRODUCT
    const deleteProduct = async (productId, category, subcategory, onDelete) => {
        try {
            // Dərhal UI-dan sil
            if (onDelete) {
                onDelete(productId);
            }

            // Server-ə göndər
            const response = await fetch("http://localhost:3000/allProducts");
            const allProducts = await response.json();

            const categoryData = allProducts.find(
                (cat) => cat.categoryId === category
            );

            if (!categoryData) {
                Swal.fire("Error", "Category not found!", "error");
                return false;
            }

            categoryData.products[subcategory] =
                categoryData.products[subcategory].filter(
                    (product) => product.id !== productId
                );

            await fetch(
                `http://localhost:3000/allProducts/${categoryData.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(categoryData)
                }
            );

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Product has been deleted successfully.",
                timer: 1200,
                showConfirmButton: false
            });

            return true;
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to delete product!", "error");
            return false;
        }
    };

    return {
        addProduct,
        editProduct,
        deleteProduct
    };
};