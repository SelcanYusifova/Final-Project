import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
    const { t } = useTranslation();
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setTheme(localStorage.getItem("theme") || "light");
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div
            className={`min-h-screen flex transition-colors duration-300
            ${theme === "light" ? "bg-white" : "bg-black"}`}
        >
            <div
                className="hidden lg:block w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://static.zarahome.net/assets/public/7d07/fdf6/683344e29e9a/44aa83265c4b/index/index.jpg?ts=1726667724254&d=20260106')",
                }}
            />

            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="max-w-[420px] px-6 text-center">

                    <h1
                        className={`text-[28px] font-[600] mb-[16px]
                        ${theme === "light" ? "text-black" : "text-white"}`}
                    >
                        {t("title")}
                    </h1>

                    <p
                        className={`text-[14px] mb-[48px]
                        ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
                    >
                        {t("description")}
                    </p>

                    <Link
                        to="/"
                        className={`inline-block px-[48px] py-[12px] text-[12px] font-[600]
                        tracking-widest transition
                        ${theme === "light"
                                ? "bg-black text-white hover:bg-[#1E1E1E]"
                                : "bg-white text-black hover:bg-gray-200"}`}
                    >
                        {t("backHome")}
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default NotFound;
