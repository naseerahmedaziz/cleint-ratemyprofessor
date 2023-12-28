import React, { useState } from 'react';
import './AdminLogin.css'; 
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import back2 from "../Assets/back2.png";
import axios from 'axios';
import store from './../redux/store'


const AdminLogin = () => {
  const [loginemail, loginsetEmail] = useState('');
  const [loginpassword, loginsetPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('handleLogin called');
    // Check if the provided credentials are correct
    // if (loginemail === 'admin@admin.com' && loginpassword === 'Pakistan@2') {
    //   console.log('Admin login successful. Navigating to /profile');
    //   toast.success('Success!');
    //   navigate('/admin');
    // } else {
    //   toast.error('Invalid email or password');
    //   return;
    // }
    axios.post('http://localhost:3000/admin/adminLogin', {
      email: loginemail,
      password: loginpassword
  })
  .then((response) => {
    console.log("response", response, response.status);
    if (response.status === 200) {
    
      console.log('Admin login successful. Navigating to /admin');
      toast.success('Success!');
      navigate('/admin');
     
       const token = response.data.token;
       store.dispatch({ type: 'SAVE_TOKEN', payload: token });
      

    } else {
      toast.error('Invalid email or password', response);
    }
  })
  .catch((error) => {
    toast.error('An error occurred while logging in');
    console.error('Error during login:', error);
  });

  };

  return (
    <div className="ars-adminLogin-cont">
      <img
      src={back2}
      alt="Back"
      className="back-button"
      onClick={() => navigate('/mainpage')}
    />
      <div className={"Admincontainer"}>
        <ToastContainer />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
          <form>
            <h1>Login</h1>
            <div className="Adminsocial-container">
              <a href="#" className="Adminsocial"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="Adminsocial"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="Adminsocial"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="text" placeholder="Email" value={loginemail} onChange={(e) => loginsetEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={loginpassword} onChange={(e) => loginsetPassword(e.target.value)}/>
            <a href="#">Forgot your password?</a>
            {error && <div className="Adminerror-message">{error}</div>}
            {success && <div className="Adminsuccess-message">{success}</div>}
            <button className="but" onClick={(e) => handleLogin(e)}>Login</button>
          </form>
      </div>
    </div>
  );
};

export default AdminLogin;
