import React from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="ars-mainpage-cont">
        <div className="mtab">
        </div>
        <div className="main-page">
            <div className="welcome-container">
                <h1>Welcome to</h1>
                <h2>Rate My Professor (RMP)</h2>
            </div>
            <div className="option">
                <h2>Admin</h2>
                <p>Login as an admin to manage the system.</p>
                <Link to="/adminlogin">
                    <button className="buttons">Admin Login</button>
                </Link>
            </div>
            <div className="option">
                <h2>User</h2>
                <p>Login or sign up as a user to access personalized features.</p>
                <Link to="/login/">
                    <button className="buttons">User Login/Signup</button>
                </Link>
            </div>
        </div>
        <p className="bottom-paragraph">
            Transform your learning experience by anonymously sharing and accessing valuable instructor feedback.
            Enhance transparency, accountability, and the overall education quality.
            Join us for a smarter academic journey!
        </p>
        
    </div>
  );
};

export default MainPage;
