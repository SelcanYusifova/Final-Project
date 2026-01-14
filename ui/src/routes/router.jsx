import { createBrowserRouter } from "react-router";
import Layout from "../user/layout/Layout";
import About from "../user/pages/About";
import Register from "../user/pages/Register";
import SubcategoryPage from "../user/pages/SubcategoryPage";
import Login from "../user/pages/login";
import Home from "../user/pages/home";
import Help from "../user/pages/help";

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
                element: <SubcategoryPage />,
                path: "/:categorySlug/:subcategorySlug",
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
    }
]);
