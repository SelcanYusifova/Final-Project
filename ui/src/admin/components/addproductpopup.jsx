import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import ProductForm from './ProductForm';
import { useProductOperations } from './useProductOperations';

function AddProductPanel({ isOpen, onClose, onProductAdded, onProductUpdated, editProduct, category, subcategory }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const isEditMode = !!editProduct;
    const { addProduct, editProduct: updateProduct } = useProductOperations();

    const [formData, setFormData] = useState({
        name: { az: '', en: '', ru: '' },
        image: '',
        price: '',
        oldPrice: '',
        sizes: [
            { type: 'Twin', dimensions: '', oldPrice: '', price: '' },
            { type: 'Full/Queen', dimensions: '', oldPrice: '', price: '' },
            { type: 'King', dimensions: '', oldPrice: '', price: '' }
        ],
        variants: [
            { color: 'white', hex: '#FFFFFF', image: '' }
        ]
    });

    // Load categories
    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error('Categories fetch error:', err));
    }, []);

    // Load edit product data
    useEffect(() => {
        if (editProduct && isOpen) {
            const productImage = editProduct.image || 
                (editProduct.variants && editProduct.variants.length > 0 && editProduct.variants[0].image) || 
                '';

            setFormData({
                name: editProduct.name || { az: '', en: '', ru: '' },
                image: productImage,
                price: '',
                oldPrice: '',
                sizes: editProduct.sizes && editProduct.sizes.length > 0 
                    ? editProduct.sizes 
                    : [{ type: 'Twin', dimensions: '', oldPrice: '', price: '' }],
                variants: editProduct.variants && editProduct.variants.length > 0
                    ? editProduct.variants
                    : [{ color: 'white', hex: '#FFFFFF', image: '' }]
            });
            setSelectedCategory(category || '');
            setSelectedSubcategory(subcategory || '');
        } else if (!isOpen) {
            resetForm();
        }
    }, [editProduct, isOpen, category, subcategory]);

    const resetForm = () => {
        setFormData({
            name: { az: '', en: '', ru: '' },
            image: '',
            price: '',
            oldPrice: '',
            sizes: [
                { type: 'Twin', dimensions: '', oldPrice: '', price: '' },
                { type: 'Full/Queen', dimensions: '', oldPrice: '', price: '' },
                { type: 'King', dimensions: '', oldPrice: '', price: '' }
            ],
            variants: [
                { color: 'white', hex: '#FFFFFF', image: '' }
            ]
        });
        setSelectedCategory('');
        setSelectedSubcategory('');
    };

    // Size management
    const addSizeRow = () => {
        setFormData(prev => ({
            ...prev,
            sizes: [...prev.sizes, { type: '', dimensions: '', oldPrice: '', price: '' }]
        }));
    };

    const removeSizeRow = (index) => {
        if (formData.sizes.length <= 1) return;
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.filter((_, i) => i !== index)
        }));
    };

    const updateSizeField = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.map((size, i) =>
                i === index ? { ...size, [field]: value } : size
            )
        }));
    };

    // Variant management
    const addVariantRow = () => {
        setFormData(prev => ({
            ...prev,
            variants: [...prev.variants, { color: '', hex: '', image: '' }]
        }));
    };

    const removeVariantRow = (index) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }));
    };

    const updateVariantField = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.map((variant, i) =>
                i === index ? { ...variant, [field]: value } : variant
            )
        }));
    };

    // Submit handler
    const handleSubmit = async () => {
        let success;

        if (isEditMode) {
            success = await updateProduct(formData, selectedCategory, selectedSubcategory, editProduct, onProductUpdated);
        } else {
            success = await addProduct(formData, selectedCategory, selectedSubcategory, onProductAdded);
        }

        if (success) {
            resetForm();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Blur overlay */}
            <div
                className="fixed inset-0 z-[1040]"
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                }}
                onClick={onClose}
            />

            {/* Popup */}
            <div className="fixed inset-0 z-[1050] flex items-center justify-center px-4">
                <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-lg shadow-2xl overflow-y-auto relative">
                    <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
                        <h2 className="text-xl font-semibold">
                            {isEditMode ? 'Edit Product' : 'Add new product'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <IoMdClose className="cursor-pointer text-2xl text-gray-500 hover:text-black" />
                        </button>
                    </div>

                    <ProductForm
                        formData={formData}
                        setFormData={setFormData}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedSubcategory={selectedSubcategory}
                        setSelectedSubcategory={setSelectedSubcategory}
                        isEditMode={isEditMode}
                        updateSizeField={updateSizeField}
                        updateVariantField={updateVariantField}
                        addSizeRow={addSizeRow}
                        removeSizeRow={removeSizeRow}
                        addVariantRow={addVariantRow}
                        removeVariantRow={removeVariantRow}
                    />

                    <div className="flex justify-end gap-3 p-6 border-t bg-white sticky bottom-0">
                        <button
                            onClick={handleSubmit}
                            className="cursor-pointer px-8 py-3 bg-black text-white hover:bg-gray-800 font-medium"
                        >
                            {isEditMode ? 'Update product' : 'Add product'}
                        </button>
                        <button
                            onClick={onClose}
                            className="cursor-pointer px-8 py-3 border hover:bg-gray-100 font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProductPanel;