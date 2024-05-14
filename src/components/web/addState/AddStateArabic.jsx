import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from '../addState/AddState.module.css'
import { UserContext } from "../context/User";
import { toast } from "react-toastify";
import {useNavigate } from 'react-router-dom'

const AddState = () => {
    const navigat=useNavigate();
    let { userToken} = useContext(UserContext);
    console.log(userToken);
    let [userId,setUserId]=useState(()=>{
        return localStorage.getItem('userId') || null;
    });

    const [address, setAddress] = useState("");
    const [typeEstates, setTypeEstates] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [typeEstateSR, setTypeEstateSR] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    
    useEffect(()=>{
        if(userId)
        {
            localStorage.setItem('userId',userId);
        }
    },[userId])
    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        console.log("test");
        const formData = new FormData();
        formData.append("ownerId",userId);
        formData.append("address", address);
        formData.append("typeEstates",typeEstates);
        formData.append("price", parseInt(price));
        formData.append("area", parseInt(area));
        formData.append("typeEstateSR", typeEstateSR);
        formData.append("description",description);

        if (["House", "Apartment", "Chalet"].includes(typeEstates)) {
            formData.append("bathrooms", parseInt(bathrooms));
            formData.append("bedrooms", parseInt(bedrooms));
        }

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        const data = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(data);
        const config = {
            headers: 
            {
                "Content-Type": "multipart/form-data",
                token: userToken,
            }
        };
        try {
            const {data} = await axios.post(
                "https://estatetest.onrender.com/api/estate/create",
                formData,
                config,
            );
            if(data.message=="success")
                {
                    toast.success("تمت إضافة العقار بنجاح");
                    navigat('/ara/profileArabic/myEstateArabic');
                }

        }catch (err) {
            // Handle network errors or other exceptions
            if (err.response && err.response.status === 401) {
                // Unauthorized access
                toast.error("الوصول غير المصرح به. الرجاء تسجيل الدخول.");
                navigat('/ara/loginArabic');
            } else {
                // Other errors
                console.error(err);
                toast.error("حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.");
            }
        }

        // Explicitly reset state fields
        setUserId("");
        setAddress("");
        setTypeEstates("");
        setBathrooms("");
        setBedrooms("");
        setPrice("");
        setArea("");
        setTypeEstateSR("");
        setDescription("");
        setImages([]);
    };
    
    const showBathroomsBedrooms = !["Store", "Land"].includes(typeEstates);

    return (
        <div className="container" dir="rtl">
            <div className={`${style.AddState}`}>
            <p>لنجعلها تحدث</p>
            <span>هل أنت مستعد لاتخاذ الخطوة الأولى نحو العقار الذي تحلم به؟ قم بملء النموذج أدناه، وسيقوم سحراء العقارات لدينا بالعمل على العثور على التوافق المثالي الخاص بك. لا تنتظر؛ دعنا نبدأ في هذه الرحلة المثيرة معًا.</span>
            </div>

            <form onSubmit={handleSubmit} id="myForm">
                <div className="row">
                <div className="col-md-3">
                    <div className="location">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> حالة الموقع:</label>
                    <select className="form-select w-75 border-4" required value={address} onChange={(e) => setAddress(e.target.value)}>
                        <option value="">اختر الموقع</option>
                        <option value="Ramallah">رام الله</option>
                        <option value="Tulkarm">طولكرم</option>
                        <option value="Nablus">نابلس</option>
                    </select>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="type">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> نوع العقار:</label>
                    <select className="form-select w-75 border-4" required value={typeEstates} onChange={(e) => setTypeEstates(e.target.value)}>
                        <option value="">نوع العقار</option>
                        <option value="House">منزل</option>
                        <option value="Apartment">شقة</option>
                        <option value="Land">أرض</option>
                        <option value="Store">متجر</option>
                        <option value="Chalet">شاليه</option>
                    </select>
                    </div>
                </div>
                
                {showBathroomsBedrooms&&(
                    <>
                    <div className="col-md-3">
                    <div className="Bathrooms">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> عدد الحمامات:</label>
                    <select className="form-select w-75 border-4" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
                        <option value="">اختر عدد الحمامات</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    </div>
                </div>
                
                <div className="col-md-3">
                    <div className="Bedrooms mb-3">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> عدد الغرف:</label>
                    <select className="form-select w-75 border-4" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                        <option value="">اختر عدد الغرف</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    </div>
                </div>
                    </>
                )}
                
                <div className="col-md-3">
                    <div className="price ">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> السعر:</label>
                    <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input type="number" id="myForm" required placeholder='أدخل السعر بالدولار' className="form-control border-4" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    <span className="input-group-text">.00</span>
                    </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="area">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> المساحة (م²):</label>
                    <input type="number" required placeholder='المساحة بالمتر المربع' className="form-control border-4" value={area} onChange={(e) => setArea(e.target.value)}/>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="renterORseller mt-4">
                    <label className={`mb-2 me-2 ${style.label}`}><span className="text-danger">*</span> المؤجر أو البائع:</label>
                    
                    <input
                        type="radio"
                        name="renterOrSeller"
                        value="Rent"
                        required
                        className="form-check-input border-4 me-2"
                        checked={typeEstateSR === "Rent"}
                        onChange={(e) => setTypeEstateSR(e.target.value)}
                        
                    />
                    <label className={`me-2 ${style.label}`}>ايجار</label>
                    <input
                        type="radio"
                        name="renterOrSeller"
                        value="Sale"
                        required
                        className="form-check-input border-4 me-2"
                        checked={typeEstateSR === "Sale"}
                        onChange={(e) => setTypeEstateSR(e.target.value)}
                    />
                    <label className={` me-2 ${style.label}`}>بائع</label>
                    </div>
                </div>

                <div className="detalis mb-2">
                <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> التفاصيل:</label>
                    <textarea
                        required
                        className="form-control border-4 w-25"
                        placeholder='تفاصيل العقار'
                        value={description}
                        id="myForm"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                
                <div className="images mb-4">
                <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> الصور:</label>
                    <input
                        type="file"
                        multiple
                        required
                        className="form-control border-4 w-50"
                        onChange={(e) => setImages(e.target.files)}
                    />
                
                </div>
                
                </div>
                <button type="submit"  className={`${style.btn}`}>تقديم</button>
                
            </form>

        </div>
    );
};

export default AddState;
