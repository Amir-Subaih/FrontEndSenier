import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import style from '../house/DispalyH.module.css';
import './DetalisEstate.css';
import 'swiper/css';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fixing default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

export default function DetalisEstateArabic() {
    let [loading, setLoading] = useState(true);
    const { EstateId } = useParams();

    const stateDetails = async () => {
        const { data } = await axios.get(`https://estatetest.onrender.com/api/estate/all/${EstateId}`);
        setLoading(false);
        return data.estate;
    };

    const { data, isLoading } = useQuery("DetalisEstate", stateDetails);

    if (isLoading || loading) {
        return <h1>جارٍ التحميل....</h1>;
    }

    const showBathroomsBedrooms = ["House", "Apartment", "Chalet"].includes(data.typeEstates);
    const showStore = ["Store", "Land"].includes(data.typeEstates);
    const showRenter = ["Rent"].includes(data.typeEstateSR);
    const showSell = ["Sale"].includes(data.typeEstateSR);
    const notShowStores = !["Store", "Land", "Chalet"].includes(data.typeEstates);
    const showChaletRent = ["Chalet"].includes(data.typeEstates);

    return (
        <div className='w95 container mt-4 mb-5' dir='rtl'>
            <div className="detal my-3">
                <div className="location d-flex">
                    <FontAwesomeIcon icon={faLocationDot} className={`${style.iconLocation}`} />
                    <p className={`${style.location}`}>{data.address}</p>
                </div>
            </div>

            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={70}
                slidesPerView={2.2}
                navigation
                loop={false}
                pagination={{
                    clickable: true,
                    el: '.swiper-custom-pagination',
                }}
            >
                <div className={`${style.disImg}`}>
                    {data.imageUrl.map((imgs, index) => (
                        <SwiperSlide className={`${style.imageItem}`} key={index}>
                            <img src={imgs} alt={`Image ${index + 1}`} />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>

            {data.activated === false ? (
                <div className={`bg-danger-subtle ${style.cardInformation}`}>
                    <p className={`${style.gInfo}`}>معلومات عامة</p>
                    <div className="info ms-3">
                        <div className="row">
                            <div className="col-md-3">
                                <p className={`${style.infoState}`}>تاريخ النشر</p>
                                <p className={`${style.infoState}`}>نوع الإعلان عن العقار</p>
                                <p className={`${style.infoState}`}>نوع العقار</p>
                                <p className={`${style.infoState}`}>المساحة الصافية</p>
                                <p className={`${style.infoState}`}>السعر</p>
                                {showBathroomsBedrooms && (
                                    <>
                                        <p className={`${style.infoState}`}>عدد الغرف</p>
                                        <p className={`${style.infoState}`}>عدد الحمامات</p>
                                    </>
                                )}
                            </div>

                            <div className="col-md-4">
                                <p className={`${style.detailState}`}>{data.createdAt}</p>
                                <p className={`${style.detailState}`}>{data.typeEstateSR}</p>
                                <p className={`${style.detailState}`}>{data.typeEstates}</p>
                                <p className={`${style.detailState}`}>{data.area} م²</p>

                                {showRenter && notShowStores && (
                                    <p className={`${style.detailState}`}>{data.price}$ شهرياً</p>
                                )}
                                {showChaletRent && showRenter && (
                                    <p className={`${style.detailState}`}>{data.price}$ يومياً</p>
                                )}
                                {showSell && <p className={`${style.detailState}`}>{data.price}$</p>}
                                {showStore && showRenter && (
                                    <p className={`${style.detailState}`}>{data.price}$ سنوياً</p>
                                )}

                                {showBathroomsBedrooms && (
                                    <>
                                        <p className={`${style.detailState}`}>{data.bedrooms}</p>
                                        <p className={`${style.detailState}`}>{data.bathrooms}</p>
                                    </>
                                )}
                            </div>

                            <div className="col-md-1"></div>

                            <div className="col-md-2">
                                <p className={`${style.infoState}`}>اسم المالك</p>
                                <p className={`${style.infoState}`}>رقم المالك</p>
                                <p className={`${style.infoState}`}>حالة العقار</p>
                            </div>

                            <div className="col-md-2">
                                <p className={`${style.detailState}`}>{data.ownerId.name}</p>
                                <p className={`${style.detailState}`}>{data.ownerId.phone}</p>
                                <p className={`${style.detailState}`}>
                                    {data.activated ? "لم يتم بيعه" : "تم البيع"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`bg-primary-subtle ${style.cardInformation}`}>
                    <p className={`${style.gInfo}`}>معلومات عامة</p>
                    <div className="info ms-3">
                        <div className="row">
                            <div className="col-md-3">
                                <p className={`${style.infoState}`}>تاريخ النشر</p>
                                <p className={`${style.infoState}`}>الحالة الحالية</p>
                                <p className={`${style.infoState}`}>نوع العقار</p>
                                <p className={`${style.infoState}`}>المساحة الصافية</p>
                                <p className={`${style.infoState}`}>السعر</p>
                                {showBathroomsBedrooms && (
                                    <>
                                        <p className={`${style.infoState}`}>عدد الغرف</p>
                                        <p className={`${style.infoState}`}>عدد الحمامات</p>
                                    </>
                                )}
                            </div>

                            <div className="col-md-4">
                                <p className={`${style.detailState}`}>{data.createdAt}</p>
                                <p className={`${style.detailState}`}>{data.typeEstateSR}</p>
                                <p className={`${style.detailState}`}>{data.typeEstates}</p>
                                <p className={`${style.detailState}`}>{data.area} م²</p>

                                {showRenter && notShowStores && (
                                    <p className={`${style.detailState}`}>{data.price}$ شهرياً</p>
                                )}
                                {showChaletRent && showRenter && (
                                    <p className={`${style.detailState}`}>{data.price}$ يومياً</p>
                                )}
                                {showSell && <p className={`${style.detailState}`}>{data.price}$</p>}
                                {showStore && showRenter && (
                                    <p className={`${style.detailState}`}>{data.price}$ سنوياً</p>
                                )}

                                {showBathroomsBedrooms && (
                                    <>
                                        <p className={`${style.detailState}`}>{data.bedrooms}</p>
                                        <p className={`${style.detailState}`}>{data.bathrooms}</p>
                                    </>
                                )}
                            </div>

                            <div className="col-md-1"></div>

                            <div className="col-md-2">
                                <p className={`${style.infoState}`}>اسم المالك</p>
                                <p className={`${style.infoState}`}>رقم المالك</p>
                                <p className={`${style.infoState}`}>التوفر</p>
                            </div>

                            <div className="col-md-2">
                                <p className={`${style.detailState}`}>{data.ownerId.name}</p>
                                <p className={`${style.detailState}`}>{data.ownerId.phone}</p>
                                <p className={`${style.detailState}`}>
                                    {data.activated ? "لم يتم بيعه" : "تم البيع"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`${style.description}`}>
                <p className={`${style.Explanation}`}>الوصف</p>
                <p className={`${style.desc}`}>{data.description}</p>
            </div>

            <div className={`${style.map}`}>
                <p className={`${style.Explanation}`}>الموقع</p>
                {data.latitude && data.longitude && (
                    <MapContainer center={[data.latitude, data.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[data.latitude, data.longitude]}>
                            <Popup>
                                أنت هنا: <br /> خط العرض: {data.latitude}, خط الطول: {data.longitude}
                            </Popup>
                        </Marker>
                    </MapContainer>
                )}
            </div>
        </div>
    );
}
