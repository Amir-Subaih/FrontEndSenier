import React, { useState,useContext,useEffect } from 'react'
import style from '../home/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import RecentEstate from '../recentEstates/RecentEstate';
// import DisplayEstate from '../displayEstate/DisplayEstate';
import axios from 'axios';
import { useQuery } from 'react-query';
import DisplayHouse from '../house/DisplayHouse';
import DisplayLand from '../land/DisplayLand';
import ContactUs from '../contact/ContactUs';
import DisplayFeedback from '../displayFeedback/DisplayFeedback';
import { UserContext } from '../context/User';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    // const [activeButton, setActiveButton] = useState("");

    // const isActive = (btn) => {
    //     setActiveButton(btn);
    // }

    let {userData,userToken,isAdmin}=useContext(UserContext);
    const navigat=useNavigate();
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
            const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?typeEatateS=House&pageNumber=1");
            return data;
        } catch (error) {
            console.error("Error fetching house estates:", error);
            throw error;
        }
    }

    const displayLand = async () => {
        try {
            const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?typeEatateS=Land&pageNumber=1");
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

    const { data: estateData, isLoading: isEstateLoading } = useQuery("displayEstate", RecentlyEstate );
    const { data: estateData1, isLoading: isEstateLoading1} = useQuery("displayHouseEstate", displayHouse);
    const { data: estateDataLand, isLoading: isLoadingLand} = useQuery("displayLandEstate", displayLand);
    const { data: feedback, isLoading: isLoadingFeedback } = useQuery("displayFeedback", displayFeedback);


    return (
        <>
        <div className='container'>
            <div className={`${style.bacImg}`}>
                <div className={`${style.p1}`}>
                    <p>Easy way to find a perfect property</p>
                </div>

                <div className={`${style.p2}`}>
                    <p>We provide a complete service for the sale, purchase or rental of real estate.</p>
                </div>

                <div className={`${style.rectangle}`}>
                    {/* <ul className="nav nav-pills gap-5">
                        <li className={`${style.navitem}`}>
                            <a className={`nav-link ${activeButton === "rent" ? "active" : ""}`}
                                onClick={() => isActive("rent")} >RENT</a>
                        </li>
                        <li className={`${style.navitem}`}>
                            <a className={`nav-link ${activeButton === "buy" ? "active" : ""}`}
                                onClick={() => isActive("buy")} >BUY</a>
                        </li>
                        <li className={`${style.navitem}`}>
                            <a className={`nav-link ${activeButton === "sell" ? "active" : ""}`}
                                onClick={() => isActive("sell")} >SELL</a>
                        </li>
                    </ul> */}

                    <div className="row">
                        <div className="col-md-4">
                            <div className={`${style.location}`}>
                                <p>Location</p> 

                                <select defaultValue={0} className="form-select" aria-label="Default select example">
                                    <option value={0}>Select Your City</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>

                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`${style.property}`}>
                                <p>Property Type</p>

                                <select defaultValue={0} className="form-select" aria-label="Default select example">
                                    <option value={0}>Choose Property Type</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`${style.price}`}>
                                <p>Price Range</p>

                                <select defaultValue={0} className="form-select" aria-label="Default select example">
                                    <option value={0}>Choose Price Range</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-1">
                            <div className={`${style.search}`}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={`${style.icon}`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div className={`mb-5 ${style.knownCity}`}>
                <div className={`${style.parg}`}>
                <p>We are available in many well-known City</p>
                </div>
                <div className="row">
                <div className={`col-md-3 ${style.imgHome}`}>
                    <img src='../../../../img/alquds.jpeg' className='img-fluid'/>
                    <p>Jerusalem</p>
                </div>

                <div className={`col-md-3 ${style.imgHome}`}>
                    <img src='../../../../img/gaza.jpeg' className='img-fluid'/>
                    <p>Gaza</p>
                </div>

                <div className={`col-md-3 ${style.imgHome}`}>
                    <img src='../../../../img/nablus.jpeg' className='img-fluid'/>
                    <p>Nablus</p>
                </div>

                <div className={`col-md-3 ${style.imgHome}`}>
                    <img src='../../../../img/haifa.jpeg' className='img-fluid w-100'/>
                    <p>Haifa</p>
                </div>
                </div>
            </div>
        </div>

        <RecentEstate rs={estateData} loadingR={isEstateLoading}/>
        
        <DisplayHouse sHouse={estateData1} loadingH={isEstateLoading1}/>

        <DisplayLand sLand={estateDataLand} loadingL={isLoadingLand}/>

        <DisplayFeedback df={feedback} loadingR={isLoadingFeedback}/>

        <ContactUs/>
        </>
    )
}
