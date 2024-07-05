import React, { useContext, useEffect, useState } from 'react';
import style from '../home/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import RecentEstateArabic from '../recentEstates/RecentEstateArabic';
import DisplayHouseArabic from '../house/DisplayHouseArabic';
import DisplayLandArabic from '../land/DisplayLandArabic';
import ContactUsArabic from '../contact/ContactUsArabic';
import { useNavigate } from 'react-router-dom';
import DisplayApartmentArabic from '../apartment/DisplayApartmentArabic';
import DisplayStoreArabic from '../store/DisplayStoreArabic';
import DisplayChaletArabic from '../chalet/DisplayChaletArabic';
import FeedbackArabic from '../feedback/FeedbackArabic';
import LocationArabic from '../location&likeIt/LocationArabic';
import { UserContext } from '../context/User';

export default function HomeArabic() {
    let { isAdmin } = useContext(UserContext);

    const navigat = useNavigate();
    useEffect(() => {
        if (isAdmin) {
            try {
                console.log('المستخدم هو مسؤول:', isAdmin);
                navigat('/admin');

            } catch (error) {
                console.error('خطأ في فك تشفير الرمز:', error);
            }
        }
    }, [isAdmin]);

    const [location, setLocation] = useState('');
    const [typeState, setTypeState] = useState('');
    const [rentrORseller, setRentrORseller] = useState('');
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate(`/ara/searchResultsAra?typeState=${typeState}&cityName=${location}&SR=${rentrORseller}`);
    };

    const searchOnCity = (city) => {
        navigate(`/ara/searchCityAra?cityName=${city}`);
    };

    return (
        <>
            <div className='container' dir='rtl'>
                <div className={`${style.bacImg}`}>
                    <div className={`${style.p1}`}>
                        <p>الطريقة السهلة للعثور على عقار مثالي</p>
                    </div>

                    <div className={`${style.p2}`}>
                        <p>نحن نقدم خدمة كاملة للبيع والشراء أو الإيجار للعقارات.</p>
                    </div>

                    <div className={`${style.rectangle}`}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className={`${style.locationAra}`}>
                                    <p>الموقع</p>

                                    <select className="form-select" aria-label="اختر المدينة الخاصة بك" value={location} onChange={(e) => setLocation(e.target.value)}>
                                        <option value="">اختر مدينتك</option>
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
                                <div className={`${style.propertyAra}`}>
                                    <p>نوع العقار</p>

                                    <select className="form-select" aria-label="اختر نوع العقار" value={typeState} onChange={(e) => setTypeState(e.target.value)}>
                                        <option value="">اختر نوع العقار</option>
                                        <option value="House">بيت</option>
                                        <option value="Apartment">شقة</option>
                                        <option value="Land">أرض</option>
                                        <option value="Store">متجر</option>
                                        <option value="Chalet">شاليه</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={`${style.priceAra}`}>
                                    <p>مالك/مستأجر</p>

                                    <select className="form-select" aria-label="اختر مالك أو مستأجر" value={rentrORseller} onChange={(e) => setRentrORseller(e.target.value)}>
                                        <option value="">اختر مالك أو مستأجر</option>
                                        <option value="Rent">إيجار</option>
                                        <option value="Sale">بيع</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-1">
                                <div className={`${style.searchAra}`}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`${style.icon}`} onClick={handleSearch} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`mb-5 ${style.knownCity}`}>
                    <div className={`${style.parg}`}>
                        <p>نحن متوفرون في العديد من المدن المعروفة</p>
                    </div>
                    <div className="row">
                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/alquds.jpeg' className='img-fluid' onClick={() => searchOnCity("Jerusalem")} />
                            <p>القدس</p>
                        </div>

                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/gaza.jpeg' className='img-fluid' onClick={() => searchOnCity("Gaza")} />
                            <p>غزة</p>
                        </div>

                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/nablus.jpeg' className='img-fluid' onClick={() => searchOnCity("Nablus")} />
                            <p>نابلس</p>
                        </div>

                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/haifa.jpeg' className='img-fluid w-100' onClick={() => searchOnCity("Haifa")} />
                            <p>حيفا</p>
                        </div>
                    </div>
                </div>
            </div>

            <LocationArabic />
            <RecentEstateArabic />
            <DisplayHouseArabic />
            <DisplayLandArabic />
            <DisplayApartmentArabic />
            <DisplayStoreArabic />
            <DisplayChaletArabic />
            <FeedbackArabic />
            <ContactUsArabic />
        </>
    );
}
