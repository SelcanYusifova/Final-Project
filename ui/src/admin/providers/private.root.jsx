import React from 'react'
import NotFound from '../../user/pages/notfound';

function PrivateRoot({ children }) {
    let role = localStorage.getItem("role");
    if (!role || role !== "admin"){
        return <NotFound/>
    }else{
        return children;
    }

}

export default PrivateRoot
