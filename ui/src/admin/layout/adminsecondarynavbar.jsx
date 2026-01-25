import React from 'react'

function AdminSecondaryNavbar({ category, activeSubcategory, onNavigate }) {
    return (
        <nav className="bg-white border-b border-gray-200 px-8 z-1000">
            <div className="py-3 text-xs text-gray-500">
                {category.title.en} &gt;{" "}
                {
                    category.subcategories.find(
                        s => s.slug === activeSubcategory
                    )?.title.en
                }
            </div>

            <ul className="flex gap-8 pb-4 text-sm uppercase whitespace-nowrap">
                {category.subcategories.map(sub => (
                    <li key={sub.slug}>
                        <div
                            onClick={() =>
                                onNavigate(`/admin/${category.slug}/${sub.slug}`)
                            }
                            className={`cursor-pointer pb-1 transition ${sub.slug === activeSubcategory
                                    ? "text-black border-b-2 border-black font-semibold"
                                    : "text-gray-500 hover:text-black"
                                }`}
                        >
                            {sub.title.en}
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default AdminSecondaryNavbar;
