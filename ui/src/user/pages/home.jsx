import React, { useEffect } from "react";
import Banner from "../components/banner";
import Navbar from "../layout/navbar";

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

      <Banner />

    </>
  );
}

export default Home;
