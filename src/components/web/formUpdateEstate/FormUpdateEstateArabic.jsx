import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from '../addState/AddState.module.css'
import { UserContext } from "../context/User";
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom'
import 'leaflet/dist/leaflet.css';
import { useQuery } from "react-query";

const FormUpdateEstateArabic = () => {
    const navigat = useNavigate();
    // const [estates,setEstate]=useState();
    const [loading, setLoading] = useState(true);
    let { EstateId } = useParams();
    let { userToken, userId } = useContext(UserContext);

    const myEstate = async () => {
        try {
            // setLoading(true);
            const { data } = await axios.get(`https://estatetest.onrender.com/api/estate/all/${EstateId}`);
            // setEstate(data.estate);
            setLoading(false);
            return data.estate;
        }
        catch (error) {
            console.log(error);
        }
    }

    const { data, isLoading } = useQuery("myEstate", myEstate);
    console.log(data);

    // .........................
    const [address, setAddress] = useState('');
    const [typeEstates, setTypeEstates] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [price, setPrice] = useState('');
    const [area, setArea] = useState('');
    const [typeEstateSR, setTypeEstateSR] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (data) {
            setAddress(data.address || '');
            setTypeEstates(data.typeEstates || '');
            setBathrooms(data.bathrooms || '');
            setBedrooms(data.bedrooms || '');
            setPrice(data.price || '');
            setArea(data.area || '');
            setTypeEstateSR(data.typeEstateSR || '');
            setDescription(data.description || '');
        }
    }, [data]);

    useEffect(() => {
        // Enable tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new window.bootstrap.Tooltip(tooltipTriggerEl);
        });

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("test");
        const formData = new FormData();
        formData.append("ownerId", userId);
        formData.append("address", address);
        formData.append("typeEstates", typeEstates);
        formData.append("price", price);
        formData.append("area", area);
        formData.append("typeEstateSR", typeEstateSR);
        formData.append("description", description);

        if (["House", "Apartment", "Chalet"].includes(typeEstates)) {
            formData.append("bathrooms", parseInt(bathrooms));
            formData.append("bedrooms", parseInt(bedrooms));
        }

        try {
            const { data } = await axios.put(
                `https://estatetest.onrender.com/api/estate/${EstateId}`, formData,
                { headers: { token: userToken } },
                { activated: true },

            );
            console.log(data);
            if (data.message === "success") {
                toast.success("تم تحديث العقار بنجاح");
                navigat("/ara/profileAra/myEstateAra");
            } else {
                // Handle other response states (e.g., error messages)
                toast.error(data.message);

            }
        } catch (err) {
            // Handle network errors or other exceptions
            if (err.response && err.response.status === 401) {
                // Unauthorized access
                toast.error("الوصول غير المصرح به. الرجاء تسجيل الدخول.");
            } else {
                // Other errors
                console.error(err);
                toast.error("حدث خطأ. الرجاء المحاولة مرة أخرى لاحقًا.");
            }
        }

    };

    if (isLoading || loading) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">جارٍ التحميل...</span>
            </div>
        </div>
    }

    // const showBathroomsBedrooms = ["House", "Apartment", "Chalet",""].includes(typeEstates);
    const showBathroomsBedrooms = !["Store", "Land"].includes(typeEstates);

    return (
        <div className="container" dir='rtl'>
            <div className={`${style.AddState}`}>
                <h1 className="mb-5 mt-3 ">تحديث العقار الخاص بك</h1>
            </div>

            <form onSubmit={handleSubmit} id="myForm">
                <div className="row">
                    <div className="col-md-3">
                        <div className="location">
                            <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> المدينة:</label>
                            <select className="form-select w-75 border-4" value={address} onChange={(e) => setAddress(e.target.value)}>
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
                            <select className="form-select w-75 border-4" value={typeEstates} onChange={(e) => setTypeEstates(e.target.value)}>
                                <option value="">نوع العقار</option>
                                <option value="House">منزل</option>
                                <option value="Apartment">شقة</option>
                                <option value="Land">أرض</option>
                                <option value="Store">متجر</option>
                                <option value="Chalet">شاليه</option>
                            </select>
                        </div>
                    </div>
                    {/* ززززززززززززززز */}

                    {showBathroomsBedrooms && (
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
                    {/* ,,,,,,,,,,,,,,,,,,, */}
                    <div className="col-md-3">
                        <div className="price ">
                            <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> السعر:</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text">$</span>
                                <input type="number" id="myForm" placeholder='أدخل السعر بالدولار' className="form-control border-4" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <span className="input-group-text">.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="area">
                            <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> المساحة (م²):</label>
                            <input type="number" placeholder='المساحة بالمتر المربع' className="form-control border-4" value={area} onChange={(e) => setArea(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="renterORseller mt-4">
                            <label className={`mb-2 me-2 ${style.label}`}><span className="text-danger">*</span> مستأجر أو بائع:</label>
                            <input
                                type="radio"
                                name="renterOrSeller"
                                value="Rent"

                                className="form-check-input border-4 me-2"
                                checked={typeEstateSR === "Rent"}
                                onChange={(e) => setTypeEstateSR(e.target.value)}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="المتاجر والأراضي في السنة، الشقق شهريًا، الشاليهات يوميًا"  // Add tooltip here
                            />
                            <label className={`me-2 ${style.label}`}>مستأجر</label>
                            <input
                                type="radio"
                                name="renterOrSeller"
                                value="Sale"

                                className="form-check-input border-4 me-2"
                                checked={typeEstateSR === "Sale"}
                                onChange={(e) => setTypeEstateSR(e.target.value)}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="هذا لبيع العقار"  // Add tooltip here
                            />
                            <label className={`me-2 ${style.label}`}>بائع</label>
                        </div>
                    </div>

                    <div className="detalis mb-2">
                        <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> التفاصيل:</label>
                        <textarea

                            className="form-control border-4 w-25"
                            placeholder='تفاصيل عن العقار'
                            value={description}
                            id="myForm"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                </div>
                <button type="submit" className={`${style.btn}`}>تحديث</button>

            </form>

        </div>
    );
};

export default FormUpdateEstateArabic;
