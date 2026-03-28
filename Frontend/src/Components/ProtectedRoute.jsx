import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../Features/Auth/Hooks/useAuth";

function ProtectedRoute({ children }) {
  const { user, authChecking } = useAuth();

  if (authChecking) {
    return <div style={{ padding: "2rem", fontFamily: "Manrope, Segoe UI, sans-serif" }}>Checking session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
