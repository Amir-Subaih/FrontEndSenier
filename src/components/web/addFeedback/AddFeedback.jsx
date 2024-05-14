import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from '../addFeedback/AddFeedback.module.css'
import { UserContext } from "../context/User";
import { toast } from "react-toastify";
import {useNavigate } from 'react-router-dom';

const AddFeedback = () => {
    const navigat=useNavigate();
    let { userToken} = useContext(UserContext);
    console.log(userToken);
    let [userId,setUserId]=useState(()=>{
        return localStorage.getItem('userId') || null;
    });
    const [statement, setStatement] = useState("");

    useEffect(()=>{
        if(userId)
        {
            localStorage.setItem('userId',userId);
        }
    },[userId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userId",userId);
        formData.append("statement",statement);

        const data = JSON.stringify(Object.fromEntries(formData.entries()));
        const config = {
            headers: 
            {
                "Content-Type": "multipart/form-data",
                token: userToken,
            }
        };
        try {
            const {data} = await axios.post(
                "https://estatetest.onrender.com/api/feedback",
                formData,
                config,
            );
            if(data.message=="success")
                {
                    toast.success("Feedback added successfully");
                    navigat('/');
                }

        }catch (err) {
            // Handle network errors or other exceptions
            if (err.response && err.response.status === 401) {
                // Unauthorized access
                toast.error("Unauthorized access. Please log in.");
                navigat('/login');
            } else {
                // Other errors
                console.error(err);
                toast.error("An error occurred. Please try again later.");
            }
        }

        // Explicitly reset state fields
        setUserId("");
        setStatement("");
    };

    return (
        <div className="container">
            <div className={`${style.AddState}`}>
                <p>We welcome your feedback</p>
                <span>We accept all opinions to make a better environment for you to do your work in easier ways. We hope your comments are within the goal of improvement. We would like to emphasize that you are responsible for your comments within words that respect the values of our society, and we wish you a comfortable browsing.</span>
            </div>

            <form>
                <div className="row">
                    <div className="details mb-2">
                        <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> Feedback:</label>
                            <textarea
                                required
                                className="form-control border-4 w-50"
                                placeholder=' Write your feedback'
                                value={statement}
                                onChange={(e) => setStatement(e.target.value)}
                            />
                    </div>
                </div>
                <button type="button" onClick={handleSubmit} className={`${style.btn}`}>Submit</button>
            </form>
        </div>
    );
};

export default AddFeedback;
