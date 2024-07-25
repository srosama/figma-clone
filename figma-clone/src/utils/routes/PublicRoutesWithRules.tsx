import {  Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PublicRoutesWithRules = () => {
  const auth = useAuth();
  const isAuthenticated = !!auth.state.user; 
  isAuthenticated
  if (auth.state.loading) {
    return <div>Loading...</div>;
  }

  // // If authenticated, redirect to the dashboard
  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" />;
  // }

  // If not authenticated, allow access to child routes
  return <Outlet />;
};

export default PublicRoutesWithRules;
