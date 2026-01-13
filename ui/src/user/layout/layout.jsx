import Navbar from "./navbar";
import SecondaryNavbar from "../components/secondaryNavbar";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  const showSecondaryNavbar =
    location.pathname.split("/").length >= 3;

  return (
    <>
      <Navbar />
      {showSecondaryNavbar && <SecondaryNavbar />}
      <Outlet />
    </>
  );
}

export default Layout;
