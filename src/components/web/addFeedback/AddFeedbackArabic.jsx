import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from './AddFeedback.module.css';
import { UserContext } from "../context/User";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AddFeedbackArabic = () => {
    const navigate = useNavigate();
    let { userToken, userId } = useContext(UserContext);

    const [statement, setStatement] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "https://estatetest.onrender.com/api/feedback",
                { userId: userId, statement: statement },
                { headers: { token: userToken } }
            );
            if (data.message === "success") {
                toast.success("تمت إضافة التعليق بنجاح");
                navigate('/ara');
                setStatement("");
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                toast.error("الدخول غير مصرح به. يرجى تسجيل الدخول.");
                navigate('/ara/loginAra');
            } else {
                console.error(err);
                toast.error("حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.");
            }
        }
    };

    return (
        <div className="container" dir='rtl'>
            <div className={`${style.AddState}`}>
                <p>نرحب بتعليقاتك</p>
                <span>
                    نقبل جميع الآراء لخلق بيئة أفضل لك للعمل بطرق أسهل. نأمل أن تكون تعليقاتك ضمن هدف التحسين. نود أن نؤكد أنك مسؤول عن تعليقاتك ضمن كلمات تحترم قيم مجتمعنا، ونتمنى لك تصفحاً مريحاً.
                </span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="details mb-2">
                        <label className={`mb-2 ${style.label}`}>
                            <span className="text-danger">*</span> تعليقك:
                        </label>
                        <textarea
                            required
                            className="form-control border-4 w-50"
                            placeholder='اكتب تعليقك'
                            value={statement}
                            onChange={(e) => setStatement(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className={`${style.btn}`}>إرسال</button>
            </form>
        </div>
    );
};

export default AddFeedbackArabic;
