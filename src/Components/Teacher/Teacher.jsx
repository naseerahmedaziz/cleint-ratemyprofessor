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
import axios from "axios";
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const ProfMenu = ({ match, location }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = useSelector(state => state.token);
    const userId = useSelector(state => state.userId);

    const [detail, setDetail] = useState({});
    const [reviewsAndRatings, setReviewsAndRatings] = useState();
    const [newRating, setNewRating] = useState(0); 
    const [newReview, setNewReview] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    
  //   if (!_id) {
  //     console.error('Error: _id is undefined');
  //     return null; // or handle the error in a way that makes sense for your application
  // }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
      axios
      .post(
          "http://localhost:3000/reviews/createReview",
          {
            userId: userId,
            teacherId: id,
            rating: newRating,
            comment: newReview
          },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      )
      .then((response) => {
          console.log('Review added successfully', response);
          setIsModalVisible(false);
      })
      .catch((error) => {
          console.log('errror',error.response.data);
      });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    useEffect(() => {
      const fetchTeacherDetails = async () => {
          try {
              const response = await axios.get(`http://localhost:3000/users/findTeacherByID/${id}`, {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });

              console.log("data coming in", response.data.reviews);
              setReviewsAndRatings(response.data.reviews);
              setDetail(response.data);
              setLoading(false); 
          } catch (error) {
              console.error('Error fetching teacher details:', error);
          }
      };

    //   const fetchReviewsAndRatings = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:3000/reviews/${id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });

    //         console.log(response.data); // Log the data received from the API

    //         setReviewsAndRatings(response.data);
    //     } catch (error) {
    //         console.error('Error fetching reviews and ratings:', error);
    //     }
    // };

    fetchTeacherDetails();
    // fetchReviewsAndRatings();
  }, [id, token]);

    return (
        <div
          style={{
            height: "100vh",
            overflowY: "auto", 
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
          <ProfDetail loading={loading} teacherDetails={detail} /> 
          <ProfRating reviewsAndRatings={reviewsAndRatings} />
          <ProfReview reviewsAndRatings={reviewsAndRatings} />

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
                    <Rate onChange={setNewRating} value={newRating} />
                </Form.Item>
                <Form.Item
                    name="review"
                    label="Review"
                    rules={[{ required: true, message: 'Please provide a review!' }]}
                >
                    <TextArea rows={4} onChange={e => setNewReview(e.target.value)} value={newReview} />
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
