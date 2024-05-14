import { useFormik } from 'formik'
import React, { useContext,useState } from 'react'
import { loginSchema } from '../../../validation/Validation'
import Input from '../../shared/Input'
import style from '../login/Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { UserContext } from '../context/User'

export default function Login() {
    const navigate = useNavigate();
    const {setUserToken,setUserId,userData}=useContext(UserContext);
    const [ifError,setIfError]=useState(false);
    const initialValues = {
        email: '',
        password: '',
    }
    const onSubmit = async users => {
           try {const { data } = await axios.post("https://estatetest.onrender.com/api/auth/login", users);
            console.log(data);
            if (data.message === 'success') {
                localStorage.setItem("userToken", data.token);
                setUserToken(data.token);
                localStorage.setItem("userId", data.other._id);
                setUserId(data.other._id);
                toast.success(`مرحبا ${userData.name}`);
                navigate('/ara');
            }}
            catch(error)
            {
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
            title: 'البريد الإلكتروني',
            type: 'email',
            value: formik.values.email
        },
        {
            id: 'password',
            name: 'password',
            title: 'كلمة المرور',
            type: 'password',
            value: formik.values.password
        }
    ]

    const renderInputs = inputs.map((input, index) => {
        return (
            <Input
                type={input.type}
                id={input.id}
                name={input.name}
                title={input.title}
                value={input.value}
                onChange={formik.handleChange}
                errors={formik.errors}
                touched={formik.touched}
                onBlur={formik.handleBlur}
                key={index}
            />
        )
    })

    return (
        <div className='container' dir='rtl'>
            <div className="row">
                <div className="col-md-7">
                    <img src={"../../../../img/login.png"} alt='تسجيل الدخول' className={`${style.logimg}`} />
                </div>
                <div className="col-md-5 ">
                    <div className="imgLogo">
                        <img src={"../../../../img/logoLogin.png"} alt="logoLogin" className={`${style.logoLogin}`} />
                    </div>
                    <div className={`${style.content}`}>
                        <h1>تسجيل الدخول</h1>
                        <p>إذا كنت عضوًا مسجلًا بالفعل ، فيمكنك تسجيل الدخول باستخدام عنوان بريدك الإلكتروني وكلمة المرور.</p>
                            {ifError && (
                                <div className="alert alert-danger w-75" role="alert">
                                    Email or Password error try again
                                </div>
                                )}
                    </div>
                    <form className="mt-3 " onSubmit={formik.handleSubmit}>
                        {renderInputs}
                        <button type="submit" className={`${style.btnLogin}`} disabled={!formik.isValid}>تسجيل الدخول</button>
                    </form>
                    <div className={`${style.dontAcount}`}>
                        <p>ليس لديك حساب؟ <Link to={"/register"}> <span>سجل هنا</span> </Link></p>
                    </div>
                    <div className={`${style.forgetPass}`}>
                        <p>نسيت كلمة المرور؟ <a href="https://estatetest.onrender.com/password/forgot-password"> <span>انقر هنا</span> </a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
