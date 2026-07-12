import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../features/auth/Login";
import NotFound from "../layouts/NotFound";
import Home from "../features/landing/Home";
import Register from "../features/auth/Register";
import Dashboard from "../features/dashboard/Dashboard";
import Analysis from "../features/investment/Analysis";
import Profile from "../features/profile/Profile";




const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },

    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },

    {
        element: <DashboardLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/analysis",
                element: <Analysis />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;