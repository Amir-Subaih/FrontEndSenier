import { useFormik } from 'formik'
import React, { useContext, useState} from 'react'
import { InterstingSchema} from '../../../validation/Validation'
import style from '../login/Login.module.css'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'
import { UserContext } from '../context/User'
import Input from '../../shared/Input'


export default function Interisting() {
    let {userToken,userData,userId,setUserData}=useContext(UserContext);
    const [locationFoucs,setLocationFoucs]=useState(false);
    const [likeItEstate,setLikeItEstate] = useState(false);

    const initialValues=
    {
        location:userData.location,
        typeEstateLikeIt:userData.typeEstateLikeIt,
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
            // تحديث بيانات المستخدم في السياق (context)
            setUserData(prevUserData => ({
                ...prevUserData,
                location: users.location,
                typeEstateLikeIt: users.typeEstateLikeIt
            }));

        }
    }
    
    const formik=useFormik({
        initialValues,
        onSubmit,
        validationSchema:InterstingSchema,
    })
    const inputs=[
        {
            id:'location',
            name:'location',
            title:'Location',
            type:'text',
            value:formik.values.location,
            onFocus:()=>setLocationFoucs(true),
            onBlur:()=>setLocationFoucs(false),
        },
        {
            id:'typeEstateLikeIt',
            name:'typeEstateLikeIt',
            title:'Type Estate Like It',
            type:'text',
            value: formik.values.typeEstateLikeIt,
            onFocus:()=>setLikeItEstate(true),
            onBlur:()=>setLikeItEstate(false),
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
        onFocus={input.onFocus}
        onBlur={formik.handleBlur && input.onBlur}
        key={index}/>
        )
    })

    
return (
    
    <div className='container'>
        <h1>Enter your interisting</h1>
        <div className="row">
            
            <div>
                <form className="mt-3 " onSubmit={formik.handleSubmit}>
                {renderInputs}
                <button type="submit" className={` ${style.btnLogin}`} disabled={!formik.isValid}>Update</button>
                </form>
            </div>
        </div>

        {locationFoucs&&(
            <div className="locatinName">
                <ul>
                    <li>Ramallah</li>
                    <li>Tulkarm</li>
                    <li>Nablus</li>
                    <li>Jenin</li>
                </ul>
            </div>
        )}
        {likeItEstate&&(
            <div className="likeIt">
                <ul>
                    <li>House</li>
                    <li>Apartment</li>
                    <li>Land</li>
                    <li>Store</li>
                    <li>Chalet</li>
                </ul>
            </div>
        )}
    </div>
)
}
