import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackDrop from '../backdrop';
import ProfDetail from "./TeacherDetail";
import ProfRating from "./TeacherRating";
import ProfReview from "./TeacherReview";

const ProfMenu = ({ match, location }) => {
    const { id } = useParams();
    const auth = localStorage.getItem("auth");
    const token = localStorage.getItem("token");

    const [detail, setDetail] = useState({});
    const [rating, setRating] = useState([]);
    const [review, setReview] = useState([]);

    const verifyToken = async (t) => {
        await fetch("/api/verify", {
            method: "GET",
            headers: {
                "x-access-token": t,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.response) {
                    window.location.href = "/user";
                }
            });
    };

    if (auth !== "true") {
        verifyToken(" ");
    }

    verifyToken(token);

    useEffect(() => {
        const mockApiCall = async () => {
            const detailResult = await mockApiCallDetail();
            const ratingResult = await mockApiCallRating();
            const reviewResult = await mockApiCallReview();

            setDetail(detailResult);
            setRating(ratingResult);
            setReview(reviewResult);
        };

        const mockApiCallDetail = () => {
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

        const mockApiCallRating = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([
                        { UID: "user1", rating: 4 },
                        { UID: "user2", rating: 5 },
                        // Add more mock data as needed
                    ]);
                }, 1000);
            });
        };

        const mockApiCallReview = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([
                        {
                            UID: "user1",
                            anonymous: false,
                            review: "Great professor!",
                            created_at: "2023-01-01T12:00:00Z",
                        },
                        {
                            UID: "user2",
                            anonymous: true,
                            review: "Very helpful.",
                            created_at: "2023-01-02T14:30:00Z",
                        },
                        // Add more mock data as needed
                    ]);
                }, 1000);
            });
        };

        mockApiCall();
    }, []);

    return (
        <React.Fragment>
            <BackDrop />
            <ProfDetail FID={id} />
            <ProfRating FID={id} />
            <ProfReview FID={id} />
        </React.Fragment>
    );
};

export default ProfMenu;
