import { createBrowserRouter } from "react-router";
import Layout from "../user/layout/Layout";
import Home from "../user/pages/Home";
import About from "../user/pages/About";
import Login from "../user/pages/Login";
import Register from "../user/pages/Register";
import SubcategoryPage from "../user/pages/SubcategoryPage";

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
                // Bu route hər alt kateqoriya üçün işləyəcək
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
