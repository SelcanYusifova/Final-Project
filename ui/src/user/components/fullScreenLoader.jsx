import React, { useState, useEffect } from "react";

function FullScreenLoader({ mode = "fullscreen" }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const wrapperClass =
    mode === "fullscreen"
      ? "fixed inset-0 z-2"
      : "w-full h-full";

  return (
    <div
      className={`${wrapperClass} flex items-center justify-center
      ${theme === "light" ? "bg-white" : "bg-black"}`}
    >
      <div className="relative overflow-hidden">
        <h1 className={`logo ${theme === "light" ? "text-black" : "text-white"}`}>
          LUMERA
        </h1>
        <span className={`logo-wipe ${theme === "dark" ? "logo-wipe-dark" : ""}`} />
      </div>
    </div>
  );
}

export default FullScreenLoader;
