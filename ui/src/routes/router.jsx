import { createBrowserRouter } from "react-router";
import Register from "../user/pages/Register";
import SubcategoryPage from "../user/pages/SubcategoryPage";
import Login from "../user/pages/login";
import Home from "../user/pages/home";
import Help from "../user/pages/help";
import ProductDetail from "../user/pages/productDetail";
import About from "../user/pages/about";
import Forgotpassword from "../user/pages/forgotpassword";
import ResetPassword from "../user/pages/resetpassword";
import Basket from "../user/components/basket";
import Layout from "../user/layout/layout";

export const route = createBrowserRouter([
    {
        element: <Layout />,
        path: "/",
        children: [
            {
                element: <Home />,
                index: true
            },
            {
                element: <About />,
                path: "/about",
            }, 
            {
                element: <Help />,
                path: "/help",
            },
            
            {
                element: <Basket />,
                path: "/basket",
            },

            {
                element: <SubcategoryPage />,
                path: "/:categorySlug/:subcategorySlug",
            },
              {
                element: <ProductDetail />,
                path: "/allproducts/:id",  
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/forgotpassword",
        element: <Forgotpassword />,
    },
    {
        path: "/resetpassword",
        element: <ResetPassword />,
    }
]);
