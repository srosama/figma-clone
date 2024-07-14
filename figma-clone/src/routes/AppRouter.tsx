import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const AppRouter: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const MainApp: React.FC = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default MainApp;
