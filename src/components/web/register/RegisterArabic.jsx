import React, { useState } from 'react'
import { useFormik } from 'formik'
import { registerSchema } from '../../../validation/Validation'
import Input from '../../shared/Input'
import style from '../login/Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function RegisterArabic() {
    const navigat = useNavigate();
    const [passwordFocused, setPasswordFocused] = useState(false);

    const initialValues = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
    }

    const onSubmit = async users => {
        try {
            const { data } = await axios.post("https://estatetest.onrender.com/api/auth/register", users);
            console.log(data);
            if (data.message === "success") {
                toast.success("تم التسجيل بنجاح");
                navigat("/ara/loginAra");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: registerSchema
    })

    const inputs = [
        {
            id: 'name',
            name: 'name',
            title: 'اسم المستخدم',
            className: 'form-control',
            type: 'text',
            value: formik.values.name,
        },
        {
            id: 'email',
            name: 'email',
            title: 'البريد الإلكتروني',
            type: 'email',
            className: 'form-control',
            value: formik.values.email
        },
        {
            id: 'phone',
            name: 'phone',
            title: 'رقم الهاتف',
            className: 'form-control',
            type: 'text',
            value: formik.values.phone,
        },
        {
            id: 'password',
            name: 'password',
            title: 'كلمة المرور',
            type: 'password',
            className: 'form-control',
            value: formik.values.password,
            onFocus: () => setPasswordFocused(true),
            onBlur: () => setPasswordFocused(false)
        },
        {
            id: 'confirmPassword',
            name: 'confirm_password',
            title: 'تأكيد كلمة المرور',
            type: 'password',
            className: 'form-control',
            value: formik.values.confirm_password
        },
    ]

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
            onBlur={formik.handleBlur}
            onFocus={input.onFocus}
            key={index}
        />
    ));

    return (
        <div className='container' dir='rtl'>
            <div className="row">
                <div className="col-md-7">
                    <img src={"../../../../img/login.png"} alt='register' className={`${style.logimg}`} />
                </div>
                <div className="col-md-5 ">

                    <div className="imgLogo">
                        <img src={"../../../../img/logoLogin.png"} alt="logoLogin" className={`${style.logoLogin}`} />
                    </div>

                    <div className={`${style.content}`}>
                        <h1>التسجيل</h1>
                        <p>كن عضوًا جديدًا.</p>
                    </div>

                    <form className="mt-3 " onSubmit={formik.handleSubmit}>
                        {renderInputs}
                        <button type="submit" className={`${style.btnLogin}`} disabled={!formik.isValid}>التسجيل</button>
                    </form>

                    <div className={`${style.dontAcount}`}>
                        <p> تمتلك حسابًا؟ <Link to={"/ara/loginAra"}> <span>سجل دخول هنا</span> </Link></p>
                    </div>

                    {passwordFocused && (
                        <div className="password-rules">
                            <ul>
                                <li>يجب أن تكون على الأقل 8 أحرف</li>
                                <li>يجب أن تحتوي على رقم واحد على الأقل</li>
                                <li>يجب أن تحتوي على حرف كبير وحرف صغير على الأقل</li>
                                <li>يجب أن تحتوي على حرف خاص (!@#$%^&*)</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
