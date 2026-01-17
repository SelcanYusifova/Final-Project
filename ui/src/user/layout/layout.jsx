import Navbar from "./navbar";
import SecondaryNavbar from "../components/secondaryNavbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";
import { useState } from "react";

function Layout() {
  const location = useLocation();
  const [colSize, setColSize] = useState(3);

  // SecondaryNavbar lazım olub-olmadığını yoxlayır
  const showSecondaryNavbar = location.pathname.split("/").length >= 3;

  return (
    <>
      <Navbar />
      {showSecondaryNavbar && (
        <SecondaryNavbar colSize={colSize} setColSize={setColSize} />
      )}
      {/* Page-lərə state-i göndəririk */}
      <Outlet context={{ colSize, setColSize }} />
      <Footer />
    </>
  );
}

export default Layout;
