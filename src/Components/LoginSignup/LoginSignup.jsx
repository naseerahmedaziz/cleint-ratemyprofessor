import React, { useState } from 'react';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import back2 from "../Assets/back2.png";
import axios from 'axios';
import store from './../redux/store'

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signemail, signsetEmail] = useState('');
  const [signpassword, signsetPassword] = useState('');
  const [loginemail, loginsetEmail] = useState('');
  const [loginpassword, loginsetPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateEmail = (signemail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(signemail);
  };

  const validatePassword = (signpassword) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(signpassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('handleLogin called');
    if (!loginemail || !loginpassword) {
      toast.error('All fields are required');
      return;
    }
    if (!validateEmail(loginemail)) {
      toast.error('Invalid email format');
      return;
    }
    if (!validatePassword(loginpassword)) {
      toast.error(
        'Incorect Password');
      return;
    }
    axios.post('http://localhost:3000/users/signin', {
      email: loginemail,
      password: loginpassword
  })
  .then((response) => {
    console.log("response", response, response.status);
    if (response.status === 200 || response.status === 201) {
    
      console.log('User login successful. Navigating to /user');
      toast.success('Success!');
      navigate('/user');
       const token = response.data.token;
       store.dispatch({ type: 'SAVE_TOKEN', payload: token });
    const userId =  response.data.user._id; 
    
    store.dispatch({ type: 'SAVE_USER_ID', payload: userId }); 

    const firstName = response.data.user.firstName;
    store.dispatch({ type: 'SAVE_FIRST_NAME', payload: firstName });
    const lastName = response.data.user.lastName;
    store.dispatch({ type: 'SAVE_LAST_NAME', payload: lastName });
    const email = response.data.user.email;
    store.dispatch({ type: 'SAVE_EMAIL', payload: email });
    
    
    
    
    
    // store.dispatch({ type: 'SAVE_FIRST_NAME', payload: firstName });
    // store.dispatch({ type: 'SAVE_LAST_NAME', payload: lastName });
    // store.dispatch({ type: 'SAVE_EMAIL', payload: email });
    // store.dispatch({ type: 'SAVE_UNIVERSITY', payload: university });
      

    } else {
      toast.error('Error', response);
      console.error('Error during login:', error);
    }
  })
  .catch((error) => {
    toast.error('An error occurred while logging in');
    console.error('Error during login:', error); 
  });

  };

  
  
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !signemail || !signpassword) {
      toast.error('All fields are required');
      return;
    }
  
    if (!validateEmail(signemail)) {
      toast.error('Invalid email format');
      return;
    }
  
    if (!validatePassword(signpassword)) {
      toast.error(
        'Password should be at least 8 characters long and contain one uppercase, one lowercase, a number, and a special character');
      return;
    }
  
    console.log(firstName)
    console.log(lastName)
    console.log(signemail)
    console.log(signpassword)
    axios.post('http://localhost:3000/users/signup', {
      firstName,
      lastName,
      email: signemail,
      password: signpassword
    })
    .then((response) => {
      if (response.statusText == "Created") {
        console.log('SignUp Successful');
        navigate('/user');
        const token = response.data.token;
        store.dispatch({ type: 'SAVE_TOKEN', payload: token });  
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("Sdfds")
      toast.error('User Already Exists');
    });
  
    
  };

  const sign = () => {
    setIsSignUp(true);
  }

  const login = () => {
    setIsSignUp(false);
  }

  return (
    <div className="ars-login-signup-cont">
      <img
      src={back2}
      alt="Back"
      className="back-button"
      onClick={() => navigate('/mainpage')}
    />
      <div className={`Usercontainer ${isSignUp ? 'right-panel-active' : ''}`}>
        <ToastContainer />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <div className="Userform-container sign-up-container">
          <form>
            <h1>Sign Up</h1>
            <div className="Usersocial-container">
              <a href="https://www.facebook.com/login/" className="Usersocial"><i className="fab fa-facebook-f"></i></a>
              <a href="https://accounts.google.com/signin" className="Usersocial"><i className="fab fa-google-plus-g"></i></a>
              <a href="https://www.linkedin.com/login" className="Usersocial"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <input type="text" placeholder="Email" value={signemail} onChange={(e) => signsetEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={signpassword} onChange={(e) => signsetPassword(e.target.value)}/>
            {error && <div className="Usererror-message">{error}</div>}
            {success && <div className="Usersuccess-message">{success}</div>}
            <button className="but" onClick={(e) => handleSignUp(e)}>Sign Up</button>
          </form>
        </div>

        <div className="Userform-container sign-in-container">
          <form>
            <h1>Login</h1>
            <div className="Usersocial-container">
              <a href="https://www.facebook.com/login/" className="Usersocial"><i className="fab fa-facebook-f"></i></a>
              <a href="https://accounts.google.com/signin" className="Usersocial"><i className="fab fa-google-plus-g"></i></a>
              <a href="https://www.linkedin.com/login" className="Usersocial"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" value={loginemail} onChange={(e) => loginsetEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={loginpassword} onChange={(e) => loginsetPassword(e.target.value)}/>
            <a href="#">Forgot your password?</a>
            <button className="but" onClick={(e) => handleLogin(e)}>Login</button>
          </form>
        </div>

        <div className="Useroverlay-container">
          <div className="Useroverlay">
            <div className={`Useroverlay-panel overlay-left ${isSignUp ? 'hidden' : ''}`}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="Userghost" id="Login" onClick={login}>Login</button>
            </div>
            <div className={`Useroverlay-panel overlay-right ${isSignUp ? '' : 'hidden'}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="Userghost" id="signUp" onClick={sign}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;