import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from '../addState/AddState.module.css'
import { UserContext } from "../context/User";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// حل مشكلة أيقونة العلامة الافتراضية مع Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const AddStateArabic = () => {
    const navigate = useNavigate();
    let { userToken, userId } = useContext(UserContext);

    const [address, setAddress] = useState("");
    const [typeEstates, setTypeEstates] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [typeEstateSR, setTypeEstateSR] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [location, setLocation] = useState(null); // للخريطة
    const [selectedLocation, setSelectedLocation] = useState(null); // حالة لتخزين الموقع المحدد مؤقتًا

    useEffect(() => {
        // تفعيل الإشعارات
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, []);

    // وظيفة لتعيين الموقع المؤكد بناءً على الموقع المحدد
    const handleGetLocation = () => {
        if (selectedLocation) {
            setLocation(selectedLocation);
        } else {
            toast.error('لم يتم تحديد الموقع.');
        }
    }; // للخريطة

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("ownerId", userId);
        formData.append("address", address);
        formData.append("typeEstates", typeEstates);
        formData.append("price", parseInt(price));
        formData.append("area", parseInt(area));
        formData.append("typeEstateSR", typeEstateSR);
        formData.append("description", description);
        if (location) {
            formData.append("latitude", location.latitude);
            formData.append("longitude", location.longitude);
        } else {
            toast.error("يرجى إضافة الموقع");
            return;
        }

        if (["House", "Apartment", "Chalet"].includes(typeEstates)) {
            formData.append("bathrooms", parseInt(bathrooms));
            formData.append("bedrooms", parseInt(bedrooms));
        }

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        const data = JSON.stringify(Object.fromEntries(formData.entries()));
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                token: userToken,
            }
        };

        try {
            const { data } = await axios.post(
                "https://estatetest.onrender.com/api/estate/create",
                formData,
                config
            );
            if (data.message === "success") {
                toast.success("تمت إضافة العقار بنجاح");
                navigate('/ara/profileAra/myEstateAra');
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                toast.error("الوصول غير مصرح به. يرجى تسجيل الدخول.");
                navigate('/ara/loginAra');
            } else {
                console.error(err);
                toast.error("حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.");
            }
        }

        // إعادة تعيين الحقول
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

    // مكون للتعامل مع نقرات الخريطة وتعيين الموقع المحدد
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setSelectedLocation({
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng,
                });
            },
        });

        // عرض علامة في الموقع المحدد
        return selectedLocation ? (
            <Marker position={[selectedLocation.latitude, selectedLocation.longitude]}>
                <Popup>
                    الموقع المحدد: <br /> خط العرض: {selectedLocation.latitude}, خط الطول: {selectedLocation.longitude}
                </Popup>
            </Marker>
        ) : null;
    };

    return (
        <div className="container" dir='rtl'>
            <div className={`${style.AddState}`}>
                <p>لنحققه</p>
                <span>
                    مستعد لاتخاذ الخطوة الأولى نحو عقارك الحلم؟ املأ النموذج أدناه، وسيعمل سحر العقارات لدينا على إيجاد المطابقة المثالية لك. لا تنتظر؛ دعنا نبدأ هذه الرحلة المثيرة معًا.
                </span>
            </div>

            <form onSubmit={handleSubmit} id="myForm">
                <div className="row">
                    <div className="col-md-3">
                        <div className="location">
                            <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> المدينة:</label>
                            <select className="form-select w-75 border-4" required value={address} onChange={(e) => setAddress(e.target.value)}>
                                <option value="">اختر الموقع</option>
                                <option value="Ramallah">رام الله</option>
                                <option value="Tulkarm">طولكرم</option>
                                <option value="Nablus">نابلس</option>
                                <option value="Jenin">جنين</option>
                                <option value="Jerusalem">القدس</option>
                                <option value="Gaza">غزة</option>
                                <option value="Haifa">حيفا</option>
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
                                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> عدد غرف النوم:</label>
                                    <select className="form-select w-75 border-4" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                                        <option value="">اختر عدد غرف النوم</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="col-md-3">
                        <div className="price">
                            <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> السعر:</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text">$</span>
                                <input type="number" id="myForm" required placeholder='أدخل السعر بالدولار' className="form-control border-4" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <span className="input-group-text">.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="area">
                            <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> المساحة (م²):</label>
                            <input type="number" required placeholder='المساحة بالمتر المربع' className="form-control border-4" value={area} onChange={(e) => setArea(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="renterORseller mt-4">
                            <label className={`mb-2 me-2 ${style.label}`}><span className="text-danger">*</span> مؤجر أو بائع:</label>
                            <input
                                type="radio"
                                name="renterOrSeller"
                                value="Rent"
                                required
                                className="form-check-input border-4 me-2"
                                checked={typeEstateSR === "Rent"}
                                onChange={(e) => setTypeEstateSR(e.target.value)}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="المتاجر والأراضي لكل عام، الشقق لكل شهر، الشاليهات لكل يوم" // أضف تلميحًا هنا
                            />
                            <label className={`me-2 ${style.label}`}>مؤجر</label>
                            <input
                                type="radio"
                                name="renterOrSeller"
                                value="Sale"
                                required
                                className="form-check-input border-4 me-2"
                                checked={typeEstateSR === "Sale"}
                                onChange={(e) => setTypeEstateSR(e.target.value)}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="هذا لبيع العقار" // أضف تلميحًا هنا
                            />
                            <label className={`me-2 ${style.label}`}>بائع</label>
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

                    <div className="map mb-4">
                        <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> موقع العقار:</label><br />
                        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <LocationMarker /> {/* مكون للتعامل مع الموقع المحدد وعرضه */}
                            {location && ( // عرض علامة في الموقع المؤكد
                                <Marker position={[location.latitude, location.longitude]}>
                                    <Popup>
                                        أنت هنا: <br /> خط العرض: {location.latitude}, خط الطول: {location.longitude}
                                    </Popup>
                                </Marker>
                            )}
                        </MapContainer>
                        <button onClick={handleGetLocation} className={`mt-3 ${style.btn1}`}>الحصول على الموقع</button>
                        {location && (
                            <p className={`${style.mas}`}>تمت إضافة الموقع بنجاح</p>
                        )}
                    </div> {/* للخريطة */}

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
                <button type="submit" className={`${style.btn}`}>إرسال</button>
            </form>
        </div>
    );
};

export default AddStateArabic;
