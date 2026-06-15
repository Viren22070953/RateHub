import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const roleHome = {
  admin: "/admin/dashboard",
  user: "/user/stores",
  store_owner: "/owner/dashboard",
};

const ProtectedRoute = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/not-allowed" replace state={{ from: location, home: roleHome[user.role] || "/" }} />;
  }

  return children;
};

export default ProtectedRoute;
