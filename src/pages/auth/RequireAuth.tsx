import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
