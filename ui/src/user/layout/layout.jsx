import Navbar from "./navbar";
import SecondaryNavbar from "../components/secondaryNavbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";

function Layout() {
  const location = useLocation();

  const showSecondaryNavbar =
    location.pathname.split("/").length >= 3;

  return (
    <>
      <Navbar />
      {showSecondaryNavbar && <SecondaryNavbar />}
      <Outlet />
      <Footer/>
    </>
  );
}

export default Layout;
