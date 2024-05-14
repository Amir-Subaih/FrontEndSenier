import { useFormik } from 'formik'
import React, { useContext, useEffect, useState} from 'react'
import { UpdateInfoSchema} from '../../../validation/Validation'
import style from '../login/Login.module.css'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'

import InputUpdate from '../../shared/InputUpdate'
import { UserContext } from '../context/User'
import { useNavigate } from 'react-router-dom'

export default function UpdateInfo() {
    const navigate=useNavigate();
    let {userToken,userData}=useContext(UserContext);
    const [isAccountUpdated, setIsAccountUpdated] = useState(false);

    let [userId,setUserId] =useState(()=>{
        return localStorage.getItem('userId') || null;
    })
    console.log(userId);

    const initialValues=
    {
        name:userData.name,
        email:userData.email,
        phone:userData.phone,
    }
    const onSubmit=async users=>{
        const {data}=await axios.put(`https://estatetest.onrender.com/api/users/${userId}`,users,
        {headers:{token:userToken}});
        console.log(data);
        
        if(data.message=='success')
        {   
            toast.success('Update Success', {
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
            setTimeout(()=>{
                setIsAccountUpdated(true);
            },2000)
        }
    }
    useEffect(()=>{
        if(userId)
        {
            localStorage.setItem('userId',userId);
        }
        if(isAccountUpdated)
        {
            window.location.reload();
            // navigate("");
            // toast.success("Update Success")
        }
    },[isAccountUpdated,userId]);

    const formik=useFormik({
        initialValues,
        onSubmit,
        validationSchema:UpdateInfoSchema,
    })
    const inputs=[
        {
            id:'name',
            name:'name',
            title:'User Name',
            type:'text',
            value:formik.values.name
        },
        {
        id:'email',
        name:'email',
        title:'Email address',
        type:'email',
        value:formik.values.email
        },
        {
            id:'phone',
            name:'phone',
            title:'Phone Number',
            type:'text',
            value:formik.values.phone
        },

    ]

    const renderInputs=inputs.map((input,index)=>{
        return (
        <InputUpdate type={input.type} 
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
            
            <div>
                <form className="mt-3 " onSubmit={formik.handleSubmit}>
                {renderInputs}
                <button type="submit" className={`${style.btnLogin}`} disabled={!formik.isValid}>Update</button>
                </form>
            </div>
        </div>

    </div>
)
}
