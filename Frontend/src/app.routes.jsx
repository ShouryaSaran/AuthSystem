import { createBrowserRouter, Navigate } from "react-router"
import SignUp from "./Features/Auth/Pages/SignUp"
import Login from "./Features/Auth/Pages/Login"
import Dashboard from "./Features/Dashboard/Pages/Dashboard"
import ProtectedRoute from "./Components/ProtectedRoute"
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element:<SignUp/>
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        )
    }
])