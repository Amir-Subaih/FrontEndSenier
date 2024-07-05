import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { loginSchema } from '../../../validation/Validation'
import Input from '../../shared/Input'
import style from '../login/Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { UserContext } from '../context/User'

export default function LoginArabic() {
    const navigat = useNavigate();
    const { setUserToken, setUserId, userData } = useContext(UserContext);
    console.log(userData);
    const [ifError, setIfError] = useState(false);
    const initialValues = {
        email: '',
        password: '',
        // checkbox:'',
    }
    const onSubmit = async (users) => {
        try {
            const { data } = await axios.post("https://estatetest.onrender.com/api/auth/login", users);
            console.log(data);
            if (data.message === 'success') {
                localStorage.setItem("userToken", data.token);
                setUserToken(data.token);
                localStorage.setItem("userId", data.other._id);
                setUserId(data.other._id);
                toast.success(`مرحباً ${data.other.name}`);
                navigat('/ara');
            }
        } catch (error) {
            console.error(error);
            setIfError(true);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: loginSchema
    })
    const inputs = [
        {
            id: 'email',
            name: 'email',
            title: 'عنوان البريد الإلكتروني',
            type: 'email',
            // className:'form-control',
            value: formik.values.email
        },
        {
            id: 'password',
            name: 'password',
            title: 'كلمة المرور',
            type: 'password',
            // className:'form-control',
            value: formik.values.password
        },
        // {
        //     id:'checkbox',
        //     name:'checkbox',
        //     title:'checkbox',
        //     type:'checkbox',
        //     className:'form-check-input',
        //     value:formik.values.checkbox,
        // }
    ]

    const renderInputs = inputs.map((input, index) => {
        return (
            <Input type={input.type}
                id={input.id}
                name={input.name}
                title={input.title}
                className={input.className}
                value={input.value}
                onChange={formik.handleChange}
                errors={formik.errors}
                touched={formik.touched}
                onBlur={formik.handleBlur}
                key={index} />
        )
    })


    return (

        <div className='container' dir='rtl'>

            <div className="row">
                <div className="col-md-7">
                    <img src={"../../../../img/login.png"} alt='تسجيل الدخول' className={`${style.logimg}`} />
                </div>
                {/* <div className="col-md-1"/> */}
                <div className="col-md-5 ">

                    <div className="imgLogo">
                        <img src={"../../../../img/logoLogin.png"} alt="شعار تسجيل الدخول" className={`${style.logoLogin}`} />
                    </div>

                    <div className={`${style.content}`}>
                        <h1>تسجيل الدخول</h1>
                        <p>إذا كنت عضوًا بالفعل يمكنك تسجيل الدخول باستخدام عنوان بريدك الإلكتروني وكلمة المرور.</p>
                        {ifError && (
                            <div className="alert alert-danger w-75" role="alert">
                                خطأ في البريد الإلكتروني أو كلمة المرور، يرجى المحاولة مرة أخرى.
                            </div>
                        )}
                    </div>

                    <form className="mt-3 " onSubmit={formik.handleSubmit}>
                        {renderInputs}
                        <button type="submit" className={`${style.btnLogin}`} disabled={!formik.isValid}>تسجيل الدخول</button>
                    </form>

                    {/* <div className="error text-danger fw-bold mt-3">
                    {ifError&&<p>email or password error try again</p>}
                    </div> */}

                    <div className={`${style.dontAcount}`}>
                        <p>لا تمتلك حسابًا؟ <Link to={"/ara/registerAra"}> <span>سجل هنا</span> </Link></p>
                    </div>

                    <div className={`${style.forgetPass}`}>
                        <p>هل نسيت كلمة المرور؟ <a href="https://estatetest.onrender.com/password/forgot-password"> <span>انقر هنا</span> </a></p>
                    </div>
                </div>
            </div>

        </div>
    )
}
