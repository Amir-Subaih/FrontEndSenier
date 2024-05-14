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
                    toast.success("تمت إضافة الملاحظة بنجاح");
                    navigat('/ara');
                }

        }catch (err) {
            // Handle network errors or other exceptions
            if (err.response && err.response.status === 401) {
                // Unauthorized access
                toast.error("الوصول غير المصرح به. الرجاء تسجيل الدخول.");
                navigat('/ara/loginArabic');
            } else {
                // Other errors
                console.error(err);
                toast.error("حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.");
            }
        }

        // Explicitly reset state fields
        setUserId("");
        setStatement("");
    };

    return (
        <div className="container" dir="rtl">
            <div className={`${style.AddState}`}>
                <p>نستقبل أرائكم</p>
                <span>نتقبل جميع الاراء لنجعل لكم بيئة افضل للقيام بي اعمالكم بي اسهل الطرق .نرجو ان تكون ملاحظاتكم ضمن هدف افضل لتطور. نود التتنويه انت مسؤل عن ملاحظاتك ضمن ألفاظ تراعي احترام قيم مجتمعناط,نتمنا لكم تصفحا مريحا.</span>
            </div>

            <form>
                <div className="row">
                    <div className="detalis mb-2">
                        <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> الملاحظة:</label>
                            <textarea
                                required
                                className="form-control border-4 w-50"
                                placeholder=' اكتب ملاحظاتك'
                                value={statement}
                                onChange={(e) => setStatement(e.target.value)}
                            />
                    </div>
                </div>
                <button type="button" onClick={handleSubmit} className={`${style.btn}`}>أضافه</button>
            </form>
        </div>
    );
};

export default AddFeedback;
