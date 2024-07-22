import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import ProtectedRoutes from '../utils/routes/ProtectedRoutes';

import Login from '../pages/Auth/Login';

import Editor from '../pages/Editor/Editor';

import PublicRoutesWithRules from '../utils/routes/PublicRoutesWithRules';
import Dashboard from '../pages/Dashboard/Dashboard';
import Register from '../pages/Auth/Register';
import Verify from '../pages/Auth/Verify';


/*
  User Is Not Authenticated:
    !-> Register -> Verify-> Register-Serices -> Dashboard -> Edior
    -> The user cannot access the protected routes
    User Is Authenticated:
    !-> Login -> Dashboard -> Edior 
    -> Router can't access either the login or register pages 
  User When To LogOut: 
    -> Change the state in the (AuthContext) 
    -> Delte the cookie or token and redirect to login
*/


const AppRouter: React.FC = () => {

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutesWithRules />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/verify' element={<Verify />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/editor' element={<Editor />}>
            {/* <Route path='/editor/newfile' element={<Editor />} /> */}
          </Route>
        </Route>


        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );

};

const MainApp: React.FC = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default MainApp;
