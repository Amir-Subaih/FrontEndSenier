import React, { useState } from "react";
import style from './Contact.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck, faLocationPinLock, faMobileRetro } from "@fortawesome/free-solid-svg-icons";
import { UserValidation } from "../../../validation/UserValidation";

function ContactUs() {
    let [errors,setErrors] =useState({
        name:'',
        email:'',
        subject:'',
        message:'',
    });

    let [users,setUsers]=useState({
        name:'',
        email:'',
        subject:'',
        message:'',
    })
    let ChangeData=(e)=>{
        const { name, value } = e.target;
        setUsers({
            ...users,
            [name]:value
        });

        if(errors[name])
        {
            setErrors({
                ...errors,
                [name]:''
            });
        }
    }
    
    const handelSubmit=async(e)=>{
        e.preventDefault();
        console.log("test");
        if(Object.keys(UserValidation(users)).length > 0)
        {
            setErrors(UserValidation(users));
        }
        else
        {
            try{
                const {data}=await axios.post("https://estatetest.onrender.com/api/sendContact",users);
                console.log(data);
                if(data.message==='success')
                {
                    toast.success("Contact Us Send Success");
                }
            }
            catch(error)
            {
                console.log(error);
            }
            
            setUsers({
                name:'',
                email:'',
                subject:'',
                message:'',
            })
        }
        
    }

    return (
        <div className="container mb-5">
            <div className={`row ${style.container}`}>
                <p className={`${style.contact}`}>Contact Us</p>
                <div className={`col-md-5 ${style.content}`}>

                    <p className={`${style.text}`}><FontAwesomeIcon icon={faLocationPinLock} className={`${style.icon}`}/>  Nablus , Palestain</p>
                    <p className={`mt-3 ${style.text}`}><FontAwesomeIcon icon={faEnvelopeCircleCheck} className={`mt-3 ${style.icon}`}/>AQ@estate.com</p>
                    <p className={` ${style.text}`}><FontAwesomeIcon icon={faMobileRetro} className={`ms-2 mt-2 ${style.icon}`}/> +970595425316</p>
                </div>
                {/* <div className="col-md-4"></div> */}
                <div className="col-md-6">
                    <form onSubmit={handelSubmit}>
                        <div className="name">
                            <input type="text" name="name" className="form-control" value={users.name} onChange={ChangeData} id="exampleFormControlInput1" placeholder="Your Name" />
                            {errors.name && <p className='text-danger'>{errors.name}</p>}
                        </div>
                        <div className="email mt-3">
                            <input type="email" name="email" className="form-control" value={users.email} onChange={ChangeData}  id="exampleFormControlInput1" placeholder="Your Email" />
                            {errors.email && <p className='text-danger'>{errors.email}</p>}
                        </div>
                        <div className="subject mt-3">
                            <input type="text" name="subject" className="form-control"  value={users.subject} onChange={ChangeData}  id="exampleFormControlInput1" placeholder="Subject" />
                            {errors.subject && <p className='text-danger'>{errors.subject}</p>}
                        </div>
                        <div className="message mt-3">
                            <textarea className="form-control" name="message" value={users.message} onChange={ChangeData} id="exampleFormControlTextarea1" rows="4" placeholder="Message"></textarea>
                            {errors.message && <p className='text-danger'>{errors.message}</p>}
                        </div>
                        <div className="btn d-flex justify-content-center mt-2 border-0">
                            <button >Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default ContactUs;
