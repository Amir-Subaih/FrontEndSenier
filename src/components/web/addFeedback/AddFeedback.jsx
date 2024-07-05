import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from './AddFeedback.module.css';
import { UserContext } from "../context/User";
import { toast } from "react-toastify";
import {useNavigate } from 'react-router-dom';

const AddFeedback = () => {
    const navigat=useNavigate();
    let { userToken,userId} = useContext(UserContext);
    // console.log(userToken);

    const [statement, setStatement] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append("userId",userId);
        // formData.append("statement",statement);

        // const data = JSON.stringify(Object.fromEntries(formData.entries()));
        // const config = {
        //     headers: 
        //     {
        //         "Content-Type": "multipart/form-data",
        //         token: userToken,
        //     }
        // };
        try {
            const {data} = await axios.post(
                "https://estatetest.onrender.com/api/feedback",
                {userId:userId,statement:statement},
                {headers:{token:userToken}}
                
            );
            if(data.message=="success")
                {
                    toast.success("Feedback added successfully");
                    navigat('/');
                    setStatement("");
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
        
    };

    return (
        <div className="container">
            <div className={`${style.AddState}`}>
                <p>We welcome your feedback</p>
                <span>We accept all opinions to make a better environment for you to do your work in easier ways. We hope your comments are within the goal of improvement. We would like to emphasize that you are responsible for your comments within words that respect the values of our society, and we wish you a comfortable browsing.</span>
            </div>

            <form onSubmit={handleSubmit}>
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
                <button type="submit" className={`${style.btn}`}>Submit</button>
            </form>
        </div>
    );
};

export default AddFeedback;
