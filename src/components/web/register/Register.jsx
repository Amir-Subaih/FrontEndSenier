import { useFormik } from 'formik'
import React, { useState } from 'react'
import { registerSchema } from '../../../validation/Validation'
import Input from '../../shared/Input'
import style from '../login/Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Register() {
    const navigat=useNavigate();
    const [passwordFocused, setPasswordFocused] = useState(false);
    const initialValues=
    {
        name: '',
        email:'',
        phone:'',
        password:'',
        confirm_password:'',
    }
    const onSubmit=async users=>{
        try{
            const {data}=await axios.post("https://estatetest.onrender.com/api/auth/register",users);
            console.log(data);
            if(data.message=="success")
            {
                toast.success("Register successfully");
                navigat("/login")
            }
            
        }
        catch(err){
            console.log(err);
        }
    }   

    const formik=useFormik({
        initialValues,
        onSubmit,
        validationSchema:registerSchema
    })

    const inputs=[
    
    {
    id:'name',
    name:'name',
    title:'UserName',
    className:'form-control',
    type:'text',
    value:formik.values.name,
    },
    {
    id:'email',
    name:'email',
    title:'Email address',
    type:'email',
    className:'form-control',
    value:formik.values.email
    },
    {
      id:'phone',
      name:'phone',
      title:'Phone',
      className:'form-control',
      type:'text',
      value:formik.values.phone,    
    },
    {
    id:'password',
    name:'password',
    title:'Password',
    type:'password',
    className:'form-control',
    value:formik.values.password,
    onFocus: () => setPasswordFocused(true),
    onBlur: () => setPasswordFocused(false)
    },
    {
        id:'confirmPassword',
        name:'confirm_password',
        title:'Confirm Password',
        type:'password',
        className:'form-control',
        value:formik.values.confirm_password
        },
    ]

    const renderInputs=inputs.map((input,index)=>{
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
        onFocus={input.onFocus}
        key={index}/>
        )
    })
return (
    <div className='container'>
        <div className="row">
            <div className="col-md-7">
                <img src={"../../../../img/login.png"} alt='register' className={`${style.logimg}`}/>
            </div>
            {/* <div className="col-md-1"/> */}
            <div className="col-md-5 ">

                <div className="imgLogo">
                    <img src={"../../../../img/logoLogin.png"} alt="logoLogin" className={`${style.logoLogin}`}/>
                </div>

                <div className={`${style.content}`}>
                    <h1>Register</h1>
                    <p>Become a member.</p>
                </div>

                <form className="mt-3 " onSubmit={formik.handleSubmit}>
                {renderInputs}
                <button type="submit" className={`${style.btnLogin}`} disabled={!formik.isValid}>Register</button>
                </form>

                {passwordFocused && (
                <div className="password-rules">
                    <ul>
                        <li>At least 8 characters long</li>
                        <li>Contains a number</li>
                        <li>Contains an uppercase letter</li>
                        <li>Contains a lowercase letter</li>
                        <li>Contains a special character (!@#$%^&*)</li>
                    </ul>
                </div>
            )}
            </div>
        </div>

    </div>
)
}
