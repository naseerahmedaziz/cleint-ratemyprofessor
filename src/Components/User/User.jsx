// Import necessary components and styles
import BackDrop from '../backdrop';
import profile from "../Assets/profile.png";
import './User.css';
import React from "react";
import { Row, Col, Input, Button, Typography, notification } from "antd";
import {
    SearchOutlined,
    UserOutlined,
    GithubOutlined,
} from "@ant-design/icons";
import ReactTypingEffect from "react-typing-effect";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;


// Adjusted component with class names from CSS
function SearchBarHome() {
    const navigate = useNavigate();
    const notify = () => {
        if (sessionStorage["badge"] === undefined) {
            sessionStorage["badge"] = true;
        }
        if (sessionStorage["badge"] === "true") {
            notification.info({
                message: "Liked it? 😍",
                description: (
                    <React.Fragment>
                        Star or contribute to this project on{" "}
                        <a
                            href="https://github.com/whoanuragverma/ratemyprof"
                            target="_blank"
                            rel="norefferer"
                        >
                            GitHub.
                        </a>
                    </React.Fragment>
                ),
                duration: 8,
                icon: <GithubOutlined />,
                placement: "bottomLeft",
                closeIcon: " ",
            });
            sessionStorage["badge"] = false;
        }
    };

    return (
        <div className="ars-user-cont">
        <div className="utab">
            Rate My Teacher (RMT)
            <img
      src={profile}
      alt="Profile"
      className="profile-buttons"
      onClick={() => navigate('/userprofile')} />
            <Link to="/login">
                <button className="logout-button">
                    Logout
                </button>
            </Link>
        </div>
            <React.Fragment>
                <BackDrop />
                <Row justify="center" align="middle" className="home">
                    <Col xs={24} lg={12} className="title-col">
                        <Title className="title">
                            <div className="fixed-text">I think my professor is</div>
                            <div className="dynamic-text">
                                <ReactTypingEffect
                                    text={[
                                        "kinda cool.",
                                        "way too chill.",
                                        "a superhero.",
                                        "a tough grader.",
                                        "ignoring my mails.",
                                        "blacklisted.",
                                        "awesome.",
                                    ]}
                                    eraseDelay={1500}
                                    speed={100}
                                    cursorRenderer={cursor => <span style={{ color: '#000', fontSize: '3em', margin:0 }}>{cursor}</span>}
                                    style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1em', fontWeight: 900, color: 'transparent', background: 'linear-gradient(to left, black, #FF416C)', WebkitBackgroundClip: 'text'}}
                                />
                            </div>
                        </Title>
                    </Col>
                    <Col xs={24} lg={12} className="input-col">
                        <Input
                            placeholder="Search for professors..."
                            prefix={<SearchOutlined />}
                            onClick={() => navigate('/usersearch')}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        </div>    
    );
}

export default SearchBarHome;
