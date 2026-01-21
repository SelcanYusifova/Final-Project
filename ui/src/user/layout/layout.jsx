import { useState, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import SecondaryNavbar from "../components/secondaryNavbar";
import FilterPanel from "../components/filterContext";
import ScrollTop from "../../providers/scrollTop";
import MainContext from "../../context/context";

function Layout() {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(MainContext);

  const [colSize, setColSize] = useState(3);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const showSecondaryNavbar = location.pathname.split("/").length >= 3;

  return (
    <ScrollTop>
      <div
        className={`min-h-screen transition-colors duration-300
          ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}
      >
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {showSecondaryNavbar && (
          <SecondaryNavbar
            colSize={colSize}
            setColSize={setColSize}
            onFilterClick={() => setIsFilterOpen(true)}
            theme={theme} 
          />
        )}

        <main>
          <Outlet
            context={{
              colSize,
              setColSize,
              priceRange,
              theme,
            }}
          />
        </main>

        {isFilterOpen && (
          <FilterPanel
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onClose={() => setIsFilterOpen(false)}
            theme={theme}
          />
        )}

        <Footer theme={theme} />
      </div>
    </ScrollTop>
  );
}

export default Layout;