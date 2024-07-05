import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { InterstingSchema } from '../../../validation/Validation';
import style from '../login/Login.module.css';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { UserContext } from '../context/User';
import Input from '../../shared/Input';

export default function InteristingArabic() {
    let { userToken, userData, userId, setUserData } = useContext(UserContext);
    const [locationFoucs, setLocationFoucs] = useState(false);
    const [likeItEstate, setLikeItEstate] = useState(false);

    const initialValues = {
        location: userData.location,
        typeEstateLikeIt: userData.typeEstateLikeIt,
    };

    const onSubmit = async (users) => {
        const { data } = await axios.put(`https://estatetest.onrender.com/api/users/${userId}`, users, {
            headers: { token: userToken },
        });
        console.log(data);

        if (data.message === 'success') {
            toast.success('تم التحديث بنجاح', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            // تحديث بيانات المستخدم في السياق (context)
            setUserData(prevUserData => ({
                ...prevUserData,
                location: users.location,
                typeEstateLikeIt: users.typeEstateLikeIt,
            }));
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: InterstingSchema,
    });

    const inputs = [
        {
            id: 'location',
            name: 'location',
            title: 'الموقع',
            type: 'text',
            value: formik.values.location,
            onFocus: () => setLocationFoucs(true),
            onBlur: () => setLocationFoucs(false),
        },
        {
            id: 'typeEstateLikeIt',
            name: 'typeEstateLikeIt',
            title: 'نوع العقار المفضل',
            type: 'text',
            value: formik.values.typeEstateLikeIt,
            onFocus: () => setLikeItEstate(true),
            onBlur: () => setLikeItEstate(false),
        },
    ];

    const renderInputs = inputs.map((input, index) => (
        <Input
            type={input.type}
            id={input.id}
            name={input.name}
            title={input.title}
            className={input.className}
            value={input.value}
            onChange={formik.handleChange}
            errors={formik.errors}
            touched={formik.touched}
            onFocus={input.onFocus}
            onBlur={formik.handleBlur && input.onBlur}
            key={index}
        />
    ));

    return (
        <div className='container' dir='rtl'>
            <h1>ادخل ما يهمك</h1>
            <div className="row">
                <div>
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        {renderInputs}
                        <button type="submit" className={`btn ${style.btnLogin}`} disabled={!formik.isValid}>
                            تحديث
                        </button>
                    </form>
                </div>
            </div>

            {locationFoucs && (
                <div className="locatinName">
                    <ul>
                        <li>رام الله</li>
                        <li>طولكرم</li>
                        <li>نابلس</li>
                        <li>جنين</li>
                    </ul>
                </div>
            )}
            {likeItEstate && (
                <div className="likeIt">
                    <ul>
                        <li>بيت</li>
                        <li>شقة</li>
                        <li>أرض</li>
                        <li>متجر</li>
                        <li>شاليه</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
