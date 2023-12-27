import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Avatar, Space, Skeleton } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import './Teacher.css'; 

const { Title, Text } = Typography;

const ProfDetail = (props) => {
    const { loading, teacherDetails } = props;

    // useEffect(() => {
    //     setLoading(!teacherDetails); // Set loading to true if teacherDetails is undefined or null
    // }, [teacherDetails]);

    return (
        <div className="ProfDetail">
            <Row gutter={10} align="middle">
                <Col lg={12} xs={24}>
                    <Space size="large">
                        <Skeleton
                            avatar={{ size: 150, shape: "square" }}
                            paragraph={{ rows: 0 }}
                            title={{ width: 0 }}
                            loading={loading}
                            active
                        >
                            <Avatar src={teacherDetails?.image} shape="square" size={150} className="draggable-avatar" />
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
                        <Title level={4} className="draggable-details">{teacherDetails?.name}</Title>
                        <b className="draggable-details">Subject: </b>
                        <Text className="draggable-details">{teacherDetails?.subject}</Text>
                        <br />
                        <b className="draggable-details">University: </b>
                        <Text className="draggable-details">{teacherDetails?.university}</Text>
                        <br />
                        <b className="draggable-details">Email: </b>
                        <a
                            href={`mailto:${teacherDetails?.email}`}
                            className="draggable-details"
                        >
                            {teacherDetails?.email}
                        </a>
                        <br />
                    </Skeleton>
                </Col>
            </Row>
        </div>
    );
};

export default ProfDetail;
