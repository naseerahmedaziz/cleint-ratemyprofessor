import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, Input, Button, List, Avatar } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
//import "antd/dist/antd.css";
import './User.css';
import back from "../Assets/back.png";
import { useNavigate } from 'react-router-dom';
import confirm from "antd/es/modal/confirm";

const { Search } = Input;



  

const SearchFullPage = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
      };
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [display, setDisplay] = useState("d-none");
    const handleSearch = (e) => {
        const name = e.target.value;
        name ? setDisplay() : setDisplay("d-none");
        setLoading(true);
        
        // console.log(searchTerm);
        // return;

        // Mock API call for illustration purposes
        // Replace this with your actual API call
        setTimeout(() => {
            setLoading(false);
            axios
			.get("http://localhost:3000/admin/findTeachers?search=" + searchTerm)
			.then((response) => {
				const data = response.data;
				console.log(data);
                setData(data);
			})
			.catch((error) => {
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
      onClick={() => navigate('/user')} // Add this line to handle the back button click
    />
                Rate My Professor (RMP)
            </div>
            
            <React.Fragment>
                <Row justify="center" align="middle" className="search">
                    <Col lg={14} sm={20}>
                    <div className="custom-search-container">
      <input
        type="text"
        placeholder="Search for professors..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
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
                                            <Link to={`/ID/${item.FID}`}>
                                                {item.name}
                                            </Link>
                                        }
                                        description={item.department}
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