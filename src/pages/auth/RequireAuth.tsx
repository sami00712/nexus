import React from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  role: "investor" | "entrepreneur";
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ role, children }) => {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
