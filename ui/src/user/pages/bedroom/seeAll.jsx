import React from "react";
import { Link } from "react-router-dom";
import SecondaryNavbar from "../../components/secondaryNavbar";
import Products from "../../components/products";

function SeeAll() {
    return (
        <>

            <SecondaryNavbar />
            <div className="h-[104px]"></div>
            <Products />

        </>
    )
}

export default SeeAll;
