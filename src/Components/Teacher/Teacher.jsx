import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Form, Input, Rate } from "antd";
import BackDrop from '../backdrop';
import ProfDetail from "./TeacherDetail";
import ProfRating from "./TeacherRating";
import ProfReview from "./TeacherReview";
import './Teacher.css'; 
import back2 from "../Assets/back2.png";
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const ProfMenu = ({ match, location }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const auth = localStorage.getItem("auth");
    const token = localStorage.getItem("token");

    const [detail, setDetail] = useState({});
    const [rating, setRating] = useState([]);
    const [review, setReview] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Handle submission logic here
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // ... Your existing code

    return (
        <div
          style={{
            height: "100vh", // Set the height to 100% of the viewport height
            overflowY: "auto", // Enable vertical scrolling
            position: "relative"
          }}
        >
          <BackDrop />
          <img
            src={back2}
            alt="Back"
            className="back-button"
            onClick={() => navigate('/usersearch')}
          />
          <button className="reviewadd-button" onClick={showModal}>Add review</button>
          <ProfDetail FID={id} />
          <ProfRating FID={id} />
          <ProfReview FID={id} />

          {/* Add Review Modal */}
          <Modal
            title="Add Review"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              name="addReviewForm"
              initialValues={{ rating: 0 }}
              onFinish={handleOk}
            >
              <Form.Item
                name="rating"
                label="Rating"
                rules={[{ required: true, message: 'Please give a rating!' }]}
              >
                <Rate />
              </Form.Item>
              <Form.Item
                name="review"
                label="Review"
                rules={[{ required: true, message: 'Please provide a review!' }]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <button type="submit">Submit Review</button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
    );
};

export default ProfMenu;
