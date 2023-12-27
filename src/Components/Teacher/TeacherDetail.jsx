import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Avatar, Button, Space, Skeleton } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import './Teacher.css'; 

const { Title, Text } = Typography;
const ProfDetail = (props) => {
    const [res, setRes] = useState([]);
    const [loading, setLoading] = useState(true);
    const mockApiCall = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              _id: "1",
              name: "Professor A",
              designation: "Assistant Professor",
              department: "Computer Science",
              school: "School of Science",
              cabin: "123",
              email: "professor.a@example.com",
              //image: back,
            });
          }, 1000);
        });
      };
      
      // Replace the existing useEffect block with this one
      useEffect(() => {
        mockApiCall().then((result) => {
          setRes(result);
          setLoading(false);
        });
      }, []);
    return (
        <div className="ProfDetail">
            <Row gutter={10} align="middle">
                <Col lg={12} xs={24}>
                    <Space size="large">
                        <Skeleton
                            avatar={{ size: 150, shape: "square"}}
                            paragraph={{ rows: 0 }}
                            title={{ width: 0 }}
                            loading={loading}
                            active
                        >
                            <Avatar src={res.image} shape="square" size={150} className="draggable-avatar"/>
                        </Skeleton>
                    </Space>
                </Col>
                <Col
                    lg={12}
                    xs={24}
                    gutter={3}
                    style={{ paddingTop: 10, fontSize: "1.1em" }}
                >
                    <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
                        <Title level={4} className="draggable-details">{res.name}</Title>
                        <Text className="draggable-details">{res.designation}</Text>
                        <br />
                        <b className="draggable-details">Subject: </b>
                        <Text className="draggable-details">{res.department}</Text>
                        <br />
                        <b className="draggable-details">University: </b>
                        <Text className="draggable-details">{res.school}</Text>
                        <br />
                        <b className="draggable-details">Email: </b>
                        <a
                            href={`mailto:${res.email}`}
                            className="draggable-details"
                        >
                            {res.email}
                        </a>
                        <br />
                    </Skeleton>
                </Col>
            </Row>
        </div>
    );
};

export default ProfDetail;