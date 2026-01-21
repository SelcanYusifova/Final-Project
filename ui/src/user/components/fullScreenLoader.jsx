import React, { useState, useEffect } from "react";

function FullScreenLoader() {
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
    <div className={`fixed inset-0 z-[5] flex items-center justify-center transition-colors duration-300
      ${theme === "light" ? "bg-white" : "bg-black"}
    `}>
      <div className="relative overflow-hidden">
        <h1 className={`logo ${theme === "light" ? "text-black" : "text-white"}`}>
          LUMERA
        </h1>

        {/* Dark mode-da logo-wipe-dark class-ı əlavə olunur */}
        <span className={`logo-wipe ${theme === "dark" ? "logo-wipe-dark" : ""}`}></span>
      </div>
    </div>
  );
}

export default FullScreenLoader;