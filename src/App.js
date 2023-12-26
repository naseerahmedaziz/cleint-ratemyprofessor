import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './Components/MainPage/MainPage';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import User from './Components/User/User';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import Admin from './Components/Admin/Admin';
import Usersearch from './Components/User/Usersearch';
import ProfMenu from './Components/Teacher/Teacher';
import UserProfile from './Components/UserProfile/UserProfile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/user" element={<User />} />
        <Route path="/usersearch" element={<Usersearch />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/ID/:id" element={<ProfMenu />} />
        <Route path="/*" element={<Navigate to="/mainpage" />} />
      </Routes>
    </Router>
  );
}

export default App;
