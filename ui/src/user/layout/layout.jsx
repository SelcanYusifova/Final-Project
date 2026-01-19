import Navbar from "./navbar";
import SecondaryNavbar from "../components/secondaryNavbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";
import { useState } from "react";
import FilterPanel from "../components/filterContext";
import ScrollTop from "../../providers/scrollTop";

function Layout() {
  const location = useLocation();
  const [colSize, setColSize] = useState(3);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const showSecondaryNavbar = location.pathname.split("/").length >= 3;

  return (
    <ScrollTop>
      <Navbar />

      {showSecondaryNavbar && (
        <SecondaryNavbar
          colSize={colSize}
          setColSize={setColSize}
          onFilterClick={() => setIsFilterOpen(true)}
        />
      )}

      <Outlet
        context={{
          colSize,
          setColSize,
          priceRange,
        }}
      />

      {isFilterOpen && (
        <FilterPanel
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      <Footer />
    </ScrollTop>
  );
}

export default Layout;
