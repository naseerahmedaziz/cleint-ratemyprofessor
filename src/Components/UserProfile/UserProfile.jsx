import React, { useState } from 'react';
import './UserProfile.css'; // Import your stylesheet

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('#about');

  const handleButtonClick = (targetSection) => {
    setActiveSection(targetSection);
  };

  return (
    <div className={`card ${activeSection === '#about' ? 'is-active' : ''}`} data-state={activeSection}>
      <div className="card-header">
        <div
          className="card-cover"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')",
          }}
        ></div>
        <img
          className="card-avatar"
          src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
          alt="avatar"
        />
        <h1 className="card-fullname">William Rocheald</h1>
        <h2 className="card-jobtitle">UI Developer</h2>
      </div>
      <div className="card-main">
        <div className={`card-section ${activeSection === '#about' ? 'is-active' : ''}`} id="about">
          {/* About Section Content */}
        </div>
        <div className={`card-section ${activeSection === '#experience' ? 'is-active' : ''}`} id="experience">
          {/* Experience Section Content */}
        </div>
        <div className={`card-section ${activeSection === '#contact' ? 'is-active' : ''}`} id="contact">
          {/* Contact Section Content */}
        </div>
        <div className="card-buttons">
          <button onClick={() => handleButtonClick('#about')} className={activeSection === '#about' ? 'is-active' : ''}>
            ABOUT
          </button>
          <button onClick={() => handleButtonClick('#experience')} className={activeSection === '#experience' ? 'is-active' : ''}>
            EXPERIENCE
          </button>
          <button onClick={() => handleButtonClick('#contact')} className={activeSection === '#contact' ? 'is-active' : ''}>
            CONTACT
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
