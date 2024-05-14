import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { loginSchema } from '../../../validation/Validation'
import Input from '../../shared/Input'
import style from '../login/Login.module.css'
import {  Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { UserContext } from '../context/User'

export default function Login() {
    const navigat=useNavigate();
    const {setUserToken,setUserId,userData}=useContext(UserContext);
    console.log(userData);
    const [ifError,setIfError]=useState(false);
    const initialValues=
    {
        email:'',
        password:'',
        // checkbox:'',
    }
    const onSubmit=async users=>{
        try
        {
            const {data}=await axios.post("https://estatetest.onrender.com/api/auth/login",users);
        console.log(data);
        if(data.message=='success')
        {   
            localStorage.setItem("userToken",data.token);
            setUserToken(data.token);
            localStorage.setItem("userId",data.other._id);
            setUserId(data.other._id);
            toast.success(`Hello ${userData.name}`);
            navigat('/');
        }
        }
        catch(error)
        {
            console.error(error);
            setIfError(true);
        }
    }

    const formik=useFormik({
        initialValues,
        onSubmit,
        validationSchema:loginSchema
    })
    const inputs=[
        {
        id:'email',
        name:'email',
        title:'Email address',
        type:'email',
        // className:'form-control',
        value:formik.values.email
    },
    {
        id:'password',
        name:'password',
        title:'Password',
        type:'password',
        // className:'form-control',
        value:formik.values.password
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
        key={index}/>
        )
    })

    
return (
    
    <div className='container'>
        
        <div className="row">
            <div className="col-md-7">
                <img src={"../../../../img/login.png"} alt='login' className={`${style.logimg}`}/>
            </div>
            {/* <div className="col-md-1"/> */}
            <div className="col-md-5 ">

                <div className="imgLogo">
                    <img src={"../../../../img/logoLogin.png"} alt="logoLogin" className={`${style.logoLogin}`}/>
                </div>

                <div className={`${style.content}`}>
                    <h1>Login</h1>
                    <p>If you are already a member you can login with your email address and password.</p>
                    {ifError && (
              <div className="alert alert-danger w-75" role="alert">
                Email or Password error try again
              </div>
            )}
                </div>

                <form className="mt-3 " onSubmit={formik.handleSubmit}>
                {renderInputs}
                <button type="submit" className={`${style.btnLogin}`} disabled={!formik.isValid}>Login</button>
                </form>

                {/* <div className="error text-danger fw-bold mt-3">
                {ifError&&<p>email or password error try again</p>}
                </div> */}
                
                <div className={`${style.dontAcount}`}>
                    <p>Dont have an account ?<Link to={"/register"}> <span> Register here</span> </Link></p>
                </div>

                <div className={`${style.forgetPass}`}>
                    <p>ForgetPassword ?<a href="https://estatetest.onrender.com/password/forgot-password"> <span> Click here</span> </a></p>
                </div>
            </div>
        </div>

    </div>
)
}
