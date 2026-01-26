import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AddProductPanel({ isOpen, onClose, onProductAdded }) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

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

    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(data => {
                console.log('Loaded categories:', data);
                setCategories(data);
            })
            .catch(err => console.error('Categories fetch error:', err));
    }, []);

    if (!isOpen) return null;

    const selectedCategoryData = categories.find(c => c.slug === selectedCategory);
    const subcategories = selectedCategoryData?.subcategories || [];

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

    const updateSizeField = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.map((size, i) =>
                i === index ? { ...size, [field]: value } : size
            )
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

    const subcategoryMap = {
        "duvet-covers": "bedroomduvetcovers",
        "bedspreads": "bedroombedspreads",
        "bedding": "bedroombedding",
        "quilts": "bedroomquilts",
        "cushion-and-throws": "bedroomcushionandthrows",
        "wardrobes-and-storage": "bedroomwardrobesandstorage",
        "see-all": "see-all"
    };

   const handleSubmit = async () => {
    if (!selectedCategory || !selectedSubcategory) {
        Swal.fire("Error", "Select a category and subcategory", "error");
        return;
    }

    if (!formData.name.en || formData.sizes.length === 0) {
        Swal.fire("Error", "Fill in the required fields", "error");
        return;
    }

    try {
        // 1. allProducts al
        const res = await fetch("http://localhost:3000/allProducts");
        const allProducts = await res.json();

        // 2. category tap
        const categoryIndex = allProducts.findIndex(
            c => c.categoryId === selectedCategory
        );

        if (categoryIndex === -1) {
            Swal.fire("Error", "Category not found", "error");
            return;
        }

        // 3. subcategory slug-u map et
        const mappedSubcategory =
            subcategoryMap[selectedSubcategory] || selectedSubcategory;

        // 4. yeni product
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

        // 5. mövcud array yoxla
        if (!productsObj[mappedSubcategory]) {
            productsObj[mappedSubcategory] = [];
        }

        productsObj[mappedSubcategory].push(newProduct);

        // 6. PUT
        await fetch(
            `http://localhost:3000/allProducts/${allProducts[categoryIndex].id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(allProducts[categoryIndex])
            }
        );

        // ✅ Callback ilə parent-ə yeni məhsulu göndər
        if (onProductAdded) {
            onProductAdded(newProduct, mappedSubcategory);
        }

        // ✅ Form-u reset et
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

        onClose();

        // ✅ Navigate (refresh OLMADAN)
        const targetUrl = `/admin/${selectedCategory}/${selectedSubcategory}`;
        if (window.location.pathname !== targetUrl) {
            navigate(targetUrl);
        }

        // Success mesajı
        Swal.fire({
            icon: "success",
            title: "Successful!",
            text: "Product added",
            timer: 1500,
            showConfirmButton: false
        });

    } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to add product", "error");
    }
};

    

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
                        <h2 className="text-xl font-semibold">Add new product</h2>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <IoMdClose className="cursor-pointer text-2xl text-gray-500 hover:text-black" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        
                        {categories.length === 0 && (
                            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                <p className="text-sm text-yellow-800">Loading categories...</p>
                            </div>
                        )}

                        {/* Category Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-semibold">Categories *</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        console.log('Category selected:', e.target.value);
                                        setSelectedCategory(e.target.value);
                                        setSelectedSubcategory('');
                                    }}
                                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-black"
                                >
                                    <option value="">Choose...</option>
                                    {categories.map(cat => (
                                        <option key={cat.slug} value={cat.slug}>
                                            {cat.title.en}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">Subcategories *</label>
                                <select
                                    value={selectedSubcategory}
                                    onChange={(e) => {
                                        console.log('Subcategory selected:', e.target.value);
                                        setSelectedSubcategory(e.target.value);
                                    }}
                                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-black"
                                    disabled={!selectedCategory}
                                >
                                    <option value="">Choose...</option>
                                    {subcategories.map(sub => (
                                        <option key={sub.slug} value={sub.slug}>
                                            {sub.title.en}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Selected Category Display */}
                        {selectedCategory && selectedSubcategory && (
                            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-sm text-green-800">
                                    <strong>Selected:</strong> {selectedCategoryData?.title.en} → {
                                        subcategories.find(s => s.slug === selectedSubcategory)?.title.en
                                    }
                                </p>
                            </div>
                        )}

                        {/* Product Name */}
                        <div className="space-y-2">
                            <label className="block font-semibold">Name Product *</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <input
                                    type="text"
                                    placeholder="English *"
                                    className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-black"
                                    value={formData.name.en}
                                    onChange={e => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
                                />
                                <input
                                    type="text"
                                    placeholder="Azərbaycanca"
                                    className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-black"
                                    value={formData.name.az}
                                    onChange={e => setFormData({ ...formData, name: { ...formData.name, az: e.target.value } })}
                                />
                                <input
                                    type="text"
                                    placeholder="Русский"
                                    className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-black"
                                    value={formData.name.ru}
                                    onChange={e => setFormData({ ...formData, name: { ...formData.name, ru: e.target.value } })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">Image URL *</label>
                            <input
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-black"
                            />
                            {formData.image && (
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="mt-3 w-full h-48 object-cover rounded-lg shadow-md"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="block font-semibold">Sizes *</label>
                                <button
                                    onClick={addSizeRow}
                                    className="px-3 py-1 bg-[#f5f5f5] text-black text-sm rounded hover:bg-gray-900 hover:text-white cursor-pointer"
                                >
                                    + Add size
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse bg-gray-50 rounded-lg">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border p-3 text-left">Type</th>
                                            <th className="border p-3 text-left">Dimensions</th>
                                            <th className="border p-3 text-left">Old Price</th>
                                            <th className="border p-3 text-left">Price *</th>
                                            <th className="border p-3 w-12"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.sizes.map((size, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="border p-3">
                                                    <input
                                                        type="text"
                                                        value={size.type}
                                                        onChange={e => updateSizeField(index, 'type', e.target.value)}
                                                        className="w-full px-2 py-1 border rounded focus:ring-1"
                                                        placeholder="Twin"
                                                    />
                                                </td>
                                                <td className="border p-3">
                                                    <input
                                                        type="text"
                                                        value={size.dimensions}
                                                        onChange={e => updateSizeField(index, 'dimensions', e.target.value)}
                                                        className="w-full px-2 py-1 border rounded focus:ring-1"
                                                        placeholder="68 x 86 in"
                                                    />
                                                </td>
                                                <td className="border p-3">
                                                    <input
                                                        type="number"
                                                        value={size.oldPrice}
                                                        onChange={e => updateSizeField(index, 'oldPrice', e.target.value)}
                                                        className="w-full px-2 py-1 border rounded focus:ring-1"
                                                    />
                                                </td>
                                                <td className="border p-3">
                                                    <input
                                                        type="number"
                                                        value={size.price}
                                                        onChange={e => updateSizeField(index, 'price', e.target.value)}
                                                        className="w-full px-2 py-1 border rounded focus:ring-1 bg-yellow-50"
                                                    />
                                                </td>
                                                <td className="border p-3">
                                                    <button
                                                        onClick={() => removeSizeRow(index)}
                                                        className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                                                        disabled={formData.sizes.length <= 1}
                                                    >
                                                        ✕
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="block font-semibold">Color</label>
                                <button
                                    onClick={addVariantRow}
                                    className="px-3 py-1 bg-[#f5f5f5] text-black text-sm rounded hover:bg-gray-900 hover:text-white cursor-pointer"
                                >
                                    + Add color
                                </button>
                            </div>
                            {formData.variants.length > 0 && (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse bg-gray-50 rounded-lg">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border p-3 text-left">Color</th>
                                                <th className="border p-3 text-left w-20">Hex</th>
                                                <th className="border p-3 text-left">Image URL</th>
                                                <th className="border p-3 w-12"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.variants.map((variant, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="border p-3">
                                                        <input
                                                            type="text"
                                                            value={variant.color}
                                                            onChange={e => updateVariantField(index, 'color', e.target.value)}
                                                            className="w-full px-2 py-1 border rounded focus:ring-1"
                                                            placeholder="white"
                                                        />
                                                    </td>
                                                    <td className="border p-3">
                                                        <input
                                                            type="text"
                                                            value={variant.hex}
                                                            onChange={e => updateVariantField(index, 'hex', e.target.value)}
                                                            className="w-full px-2 py-1 border rounded focus:ring-1"
                                                            placeholder="#F0F0F0"
                                                        />
                                                    </td>
                                                    <td className="border p-3">
                                                        <input
                                                            type="text"
                                                            value={variant.image}
                                                            onChange={e => updateVariantField(index, 'image', e.target.value)}
                                                            className="w-full px-2 py-1 border rounded focus:ring-1"
                                                            placeholder="https://..."
                                                        />
                                                    </td>
                                                    <td className="border p-3">
                                                        <button
                                                            onClick={() => removeVariantRow(index)}
                                                            className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                                                        >
                                                            ✕
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 p-6 border-t bg-white sticky bottom-0">
                        <button
                            onClick={handleSubmit}
                            className="cursor-pointer px-8 py-3 bg-black text-white hover:bg-gray-800 font-medium"
                        >
                            Add product
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