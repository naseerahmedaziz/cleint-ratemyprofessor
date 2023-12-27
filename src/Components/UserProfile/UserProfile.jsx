import React, { useState } from 'react';
import './UserProfile.css'; // Import your stylesheet
import pic from '../Assets/pic.jpeg';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('#about');
  const [profilefirstName, setprofileFirstName] = useState('');
  const [profilelastname, setprofileLastName] = useState('');
  const [profileemail, setprofileemail] = useState('');
  const [profileuni, setprofileuni] = useState('');

  const handleButtonClick = (targetSection) => {
    setActiveSection(targetSection);
  };

  const handleProfileFirstNameChange = (event) => {
    setprofileFirstName(event.target.value);
  };

  const handleProfileLastNameChange = (event) => {
    setprofileLastName(event.target.value);
  };

  const handleProfileEmailChange = (event) => {
    setprofileemail(event.target.value);
  };

  const handleProfileUniChange = (event) => {
    setprofileuni(event.target.value);
  };

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
        <h1 className="card-firstname">
          First Name:
            <input
              type="text" placeholder="First Name" value={profilefirstName} onChange={handleProfileFirstNameChange}/>
          </h1>
          <h2 className="card-lastname">
            Last Name:
            <input
              type="text"
              value={profilelastname}
              onChange={handleProfileLastNameChange}
              placeholder="Last Name"
            />
          </h2>
          <h3 className="card-email">
            Email:
            <input
              type="email"
              value={profileemail}
              onChange={handleProfileEmailChange}
              placeholder="Email"
            />
          </h3>
          <h3 className="card-uni">
            University:
            <input
              type="email"
              value={profileuni}
              onChange={handleProfileUniChange}
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
