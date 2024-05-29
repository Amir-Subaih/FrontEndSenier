import React, { useState,useContext,useEffect } from 'react';
import style from '../home/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import RecentEstateArabic from '../recentEstates/RecentEstateArabic';
import axios from 'axios';
import { useQuery } from 'react-query';
import DisplayHouseArabic from '../house/DisplayHouseArabic';
import DisplayLandArabic from '../land/DisplayLandArabic';
import ContactUsArabic from '../contact/ContactUsArabic';
import DisplayFeedbackArabic from '../displayFeedback/DisplayFeedbackArabic';
import { UserContext } from '../context/User';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    let {isAdmin}=useContext(UserContext);
    const navigat=useNavigate();
    const [activeButton, setActiveButton] = useState("");

    const isActive = (btn) => {
        setActiveButton(btn);
    }
    useEffect(() => {
        if (isAdmin) {
          try {
            console.log('user is admin :',isAdmin);
            navigat('/admin');
    
          } catch (error) {
            console.error('Error decoding the token:', error);
          }
        }
      }, [isAdmin]);
      if (isAdmin) {
        navigat('/admin');
      }

    const RecentlyEstate = async () => {
        try {
            const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?pageNumber=1");
            return data;
        } catch (error) {
            console.error("Error fetching estates:", error);
            throw error;
        }
    }

    const displayHouse = async () => {
        try {
            const { data } = await axios.get("https://estatetest.onrender.com/api/estate/house?typeEatateS=House&pageNumber=1");
            return data;
        } catch (error) {
            console.error("Error fetching house estates:", error);
            throw error;
        }
    }

    const displayLand = async () => {
        try {
            const { data } = await axios.get("https://estatetest.onrender.com/api/estate/house?typeEatateS=Land&pageNumber=1");
            return data;
        } catch (error) {
            console.error("Error fetching house estates:", error);
            throw error;
        }
    }

    const displayFeedback = async () => {
        try {
            const { data } = await axios.get("https://estatetest.onrender.com/api/feedback/all?pageNum=1");
            return data;
        } catch (error) {
            console.error("Error fetching house estates:", error);
            throw error;
        }
    }

    const { data: estateData, isLoading: isEstateLoading } = useQuery("displayEstate", RecentlyEstate);
    const { data: estateData1, isLoading: isEstateLoading1 } = useQuery("displayHouseEstate", displayHouse);
    const { data: estateDataLand, isLoading: isLoadingLand } = useQuery("displayLandEstate", displayLand);
    const { data: feedbackara, isLoading: isLoadingFeedbackara } = useQuery("displayFeedback", displayFeedback);

    return (
        <>
            <div className='container' dir='rtl'>
                <div className={`${style.bacImg}`}>
                    <div className={`${style.p1}`}>
                        <p>طريقة سهلة للعثور على العقار المثالي</p>
                    </div>

                    <div className={`${style.p2}`}>
                        <p>نحن نقدم خدمة كاملة للبيع أو الشراء أو التأجير العقاري.</p>
                    </div>

                    <div className={`${style.rectangle}`}>
                        {/* <ul className="nav nav-pills gap-5">
                            <li className={`${style.navitem}`}>
                                <a className={`nav-link ${activeButton === "rent" ? "active" : ""}`}
                                    onClick={() => isActive("rent")} >الإيجار</a>
                            </li>
                            <li className={`${style.navitem}`}>
                                <a className={`nav-link ${activeButton === "buy" ? "active" : ""}`}
                                    onClick={() => isActive("buy")} >شراء</a>
                            </li>
                            <li className={`${style.navitem}`}>
                                <a className={`nav-link ${activeButton === "sell" ? "active" : ""}`}
                                    onClick={() => isActive("sell")} >بيع</a>
                            </li>
                        </ul> */}

                        <div className="row">
                            <div className="col-md-4">
                                <div className={`${style.location}`}>
                                    <p>الموقع</p>

                                    <select defaultValue={0} className="form-select" aria-label="Default select example">
                                        <option value={0}>اختر مدينتك</option>
                                        <option value={1}>واحد</option>
                                        <option value={2}>اثنان</option>
                                        <option value={3}>ثلاثة</option>
                                    </select>

                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={`${style.property}`}>
                                    <p>نوع العقار</p>

                                    <select defaultValue={0} className="form-select" aria-label="Default select example">
                                        <option value={0}>اختر نوع العقار</option>
                                        <option value={1}>واحد</option>
                                        <option value={2}>اثنان</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={`${style.price}`}>
                                    <p>نطاق السعر</p>

                                    <select defaultValue={0} className="form-select" aria-label="Default select example">
                                        <option value={0}>اختر نطاق السعر</option>
                                        <option value={1}>واحد</option>
                                        <option value={2}>اثنان</option>
                                        <option value={3}>ثلاثة</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-1">
                                <div className={`${style.search1}`}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`${style.icon}`} />
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
                            <img src='../../../../img/alquds.jpeg' className='img-fluid' alt="Jerusalem"/>
                            <p>القدس</p>
                        </div>

                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/gaza.jpeg' className='img-fluid' alt="Gaza"/>
                            <p>غزة</p>
                        </div>

                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/nablus.jpeg' className='img-fluid' alt="Nablus"/>
                            <p>نابلس</p>
                        </div>

                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/haifa.jpeg' className='img-fluid w-100' alt="Haifa"/>
                            <p>حيفا</p>
                        </div>
                    </div>
                </div>
            </div>

            <RecentEstateArabic rs={estateData} loadingR={isEstateLoading} />

            <DisplayHouseArabic sHouse={estateData1} loadingH={isEstateLoading1} />

            <DisplayLandArabic sLand={estateDataLand} loadingL={isLoadingLand} />

            <DisplayFeedbackArabic df={feedbackara} loadingR={isLoadingFeedbackara}/>

            <ContactUsArabic />
        </>
    )
}
