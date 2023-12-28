import React, { useState } from 'react';
import './UserProfile.css'; // Import your stylesheet
import pic from '../Assets/pic.jpeg';
import { useSelector   } from 'react-redux';

const UserProfile = () => {

  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);
  const firstName = useSelector((state) => state.firstName);
  const lastName = useSelector((state) => state.lastName);
  const email = useSelector((state) => state.email);
  const university = useSelector((state) => state.university);
  const teacherId = useSelector((state) => state.teacherId);


  console.log(firstName)

  // const [activeSection, setActiveSection] = useState('#about');
  // const [profilefirstName, setprofileFirstName] = useState('');
  // const [profilelastname, setprofileLastName] = useState('');
  // const [profileemail, setprofileemail] = useState('');
  // const [profileuni, setprofileuni] = useState('');

  const handleButtonClick = (targetSection) => {
    setActiveSection(targetSection);
  };

  // const handleProfileFirstNameChange = (event) => {
  //   setprofileFirstName(event.target.value);
  // };

  // const handleProfileLastNameChange = (event) => {
  //   setprofileLastName(event.target.value);
  // };

  // const handleProfileEmailChange = (event) => {
  //   setprofileemail(event.target.value);
  // };

  // const handleProfileUniChange = (event) => {
  //   setprofileuni(event.target.value);
  // };
  // const firstName = useSelector(state => state.firstName); // Get firstName from Redux store
  // const lastName = useSelector(state => state.lastName); // Get lastName from Redux store
  // const email = useSelector(state => state.email); // Get email from Redux store
  // const university = useSelector(state => state.university); // Get university from Redux store
  const [activeSection, setActiveSection] = useState('#about');



  return (
    <div className="user-profile-container">
    <div className={`card ${activeSection === '#about' ? 'is-active' : ''}`} data-state={activeSection}>
      <div className="card-header">
        <div
          className="card-cover"
          style={{
            background: `linear-gradient(to left right, #000000, #FF416C)`,
          }}
        ></div>
        <img
          className="card-avatar"
          src={pic}
          alt="avatar"
        />

        
      </div>
      <div className="card-main">
        <div className={`card-section ${activeSection === '#about' ? 'is-active' : ''}`} id="about">
        <div>
      {/* <h1>User Profile</h1>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Email: {email}</p>
      <p>University: {university}</p> */}
      {/* ... Your existing JSX */}
    </div>
        <h1 className="card-firstname">
          First Name:
            <input
              type="text" placeholder="First Name" value={firstName} />
          </h1>
          <h2 className="card-lastname">
            Last Name:
            <input
              type="text"
              value={lastName}
             
             placeholder="Last Name"
            />
          </h2>
          <h3 className="card-email">
            Email:
            <input
              type="email"
              value={email}
              
              placeholder="Email"
            />
          </h3>
          <h3 className="card-uni">
            University:
            <input
              type="email"
              value={university}
              
              placeholder="University"
            />
          </h3>
        </div>
        {/* <div className={`card-section ${activeSection === '#experience' ? 'is-active' : ''}`} id="experience">
        </div>
        <div className={`card-section ${activeSection === '#contact' ? 'is-active' : ''}`} id="contact">
        </div> */}
        <div className="card-buttons">
          <button onClick={() => handleButtonClick('#about')} className={activeSection === '#about' ? 'is-active' : ''}>
            PROFILE
          </button>
          {/* <button onClick={() => handleButtonClick('#experience')} className={activeSection === '#experience' ? 'is-active' : ''}>
            EXPERIENCE
          </button>
          <button onClick={() => handleButtonClick('#contact')} className={activeSection === '#contact' ? 'is-active' : ''}>
            CONTACT
          </button> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;