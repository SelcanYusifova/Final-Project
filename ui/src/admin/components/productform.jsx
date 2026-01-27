import React from 'react';

function ProductForm({ 
    formData, 
    setFormData, 
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    isEditMode,
    updateSizeField,
    updateVariantField,
    addSizeRow,
    removeSizeRow,
    addVariantRow,
    removeVariantRow
}) {
    const selectedCategoryData = categories.find(c => c.slug === selectedCategory);
    const subcategories = selectedCategoryData?.subcategories || [];

    return (
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
                            setSelectedCategory(e.target.value);
                            setSelectedSubcategory('');
                        }}
                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-black"
                        disabled={isEditMode}
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
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-black"
                        disabled={!selectedCategory || isEditMode}
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

            {/* Image URL */}
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

            {/* Sizes Table */}
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

            {/* Variants/Colors Table */}
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
    );
}

export default ProductForm;