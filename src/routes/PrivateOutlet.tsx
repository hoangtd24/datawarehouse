import { useAuth } from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateOutlet = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default PrivateOutlet;
