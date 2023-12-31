import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Input, Button, List, Avatar } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
//import "antd/dist/antd.css";
import './User.css';
import back from "../Assets/back.png";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';


const { Search } = Input;


const SearchFullPage = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [display, setDisplay] = useState("d-none");
    const token = useSelector(state => state.token);
    console.log("this is token",token);
    const handleChange = (e) => {
        const name = e.target.value;
        name ? setDisplay() : setDisplay("d-none");
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            axios
			.get("http://localhost:3000/users/findTeachers?search=" + name, {
                headers: {
                 Authorization: `Bearer ${token}`
                }
              })
			.then((response) => {
				const data = response.data;
				console.log(data);
                setData(data);
			})
			.catch((error) => {
                console.log('errr', error.message);
				if (!error.response) {
					// this.errorStatus = "Error: Network Error";
				} else {
					// this.errorStatus = error.response.data.message;
				}
			});
        }, 1000);
    };
    return (
        <div className="ars-user-cont">
            <div className="ustab">
            <img
      src={back}
      alt="Back"
      className="back-buttons"
      onClick={() => navigate('/user')} 
    />
                Rate My Professor (RMP)
            </div>
            
            <React.Fragment>
                <Row justify="center" align="middle" className="search">
                    <Col lg={14} sm={20}>
                        <Search
                            placeholder="Search for professors..."
                            prefix={<SearchOutlined />}
                            enterButton
                            name="name"
                            onChange={handleChange}
                            loading={loading}
                            autoFocus
                            autoComplete={false}
                        />
                    </Col>
                </Row>
                <Row justify="center" align="middle">
                    <Col lg={14} sm={24} className="mobile-res">
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            locale={{ emptyText: " " }}
                            className={display}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={
                                            <Link to={`/ID/${item._id}`}>
                                                {item.name}
                                            </Link>
                                        }
                                        description={item.subject}
                                        avatar={
                                            <Avatar
                                                src={item.image}
                                                alt="IMAGE"
                                                size={48}
                                            />
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        </div>
    );
};

export default SearchFullPage;