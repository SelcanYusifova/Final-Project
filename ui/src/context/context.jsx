import { createContext, useState, useEffect } from "react";

const MainContext = createContext();

export function MainProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme === "dark" ? "dark-mode" : "";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}

export default MainContext;