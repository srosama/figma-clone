import {  Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoutes = () => {
  const auth = useAuth();
  const isAuthenticated = !!auth.state.user; 
  const isEmailVerified = !!auth.state.user?.emailVerified;
  

  if (isAuthenticated && isEmailVerified ) {
    return <Outlet />;
  }
};

export default ProtectedRoutes;
