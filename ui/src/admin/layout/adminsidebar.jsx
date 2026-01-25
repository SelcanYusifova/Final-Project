import React from 'react'
function AdminSidebar({ categories, activeCategory, onToggle, onNavigate }) {
    return (
        <div className="w-64 bg-black text-white min-h-screen fixed left-0 top-0 z-50">
            <div
                className="p-6 text-2xl font-bold border-b border-gray-700 cursor-pointer"
                onClick={() => onNavigate("/admin")}
            >
                LUMERA
            </div>

            <div className="overflow-y-auto">
                {categories.map(cat => (
                    <div key={cat.slug}>
                        <div
                            onClick={() => onToggle(cat.slug)}
                            className="px-6 py-3 flex justify-between cursor-pointer hover:bg-gray-800"
                        >
                            <span className="uppercase text-sm">{cat.title.en}</span>
                            <span>{activeCategory === cat.slug ? "−" : "+"}</span>
                        </div>

                        {activeCategory === cat.slug && (
                            <div className="bg-gray-900">
                                {cat.subcategories.map(sub => (
                                    <div
                                        key={sub.slug}
                                        onClick={() =>
                                            onNavigate(`/admin/${cat.slug}/${sub.slug}`)
                                        }
                                        className="pl-10 py-2 text-sm cursor-pointer hover:text-gray-300"
                                    >
                                        {sub.title.en}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminSidebar;

