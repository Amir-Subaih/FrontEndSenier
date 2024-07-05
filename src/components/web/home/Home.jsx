import React, { useContext, useEffect, useState } from 'react'
import style from '../home/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import RecentEstate from '../recentEstates/RecentEstate';
import DisplayHouse from '../house/DisplayHouse';
import DisplayLand from '../land/DisplayLand';
import ContactUs from '../contact/ContactUs';
import { useNavigate } from 'react-router-dom';
import DisplayApartment from '../apartment/DisplayApartment';
import DisplayStore from '../store/DisplayStore';
import DisplayChalet from '../chalet/DisplayChalet';
import Feedback from '../feedback/Feedback';
import Location from '../location&likeIt/Location';
import { UserContext } from '../context/User';

export default function Home() {
    let { isAdmin } = useContext(UserContext);

    const navigat = useNavigate();
    useEffect(() => {
        if (isAdmin) {
            try {
                console.log('user is admin :', isAdmin);
                navigat('/admin');

            } catch (error) {
                console.error('Error decoding the token:', error);
            }
        }
    }, [isAdmin]);


    const [location, setLocation] = useState('');
    const [typeState, setTypeState] = useState('');
    const [rentrORseller, setRentrORseller] = useState('');
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate(`/searchResults?typeState=${typeState}&cityName=${location}&SR=${rentrORseller}`);
    };

    const searchOnCity = (city) => {
        navigate(`/searchCity?cityName=${city}`);
    }

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
                        <div className="row">
                            <div className="col-md-4">
                                <div className={`${style.location}`}>
                                    <p>Location</p>

                                    <select className="form-select" aria-label="Default select example" value={location} onChange={(e) => setLocation(e.target.value)}>
                                        <option value="">Select Your City</option>
                                        <option value="Ramallah">Ramallah</option>
                                        <option value="Tulkarm">Tulkarm</option>
                                        <option value="Nablus">Nablus</option>
                                        <option value="Jenin">Jenin</option>
                                        <option value="Jerusalem">Jerusalem</option>
                                        <option value="Gaza">Gaza</option>
                                        <option value="Haifa">Haifa</option>
                                    </select>

                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={`${style.property}`}>
                                    <p>Property Type</p>

                                    <select className="form-select" aria-label="Default select example" value={typeState} onChange={(e) => setTypeState(e.target.value)}>
                                        <option value="">Choose Property Type</option>
                                        <option value="House">House</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Land">Land</option>
                                        <option value="Store">Store</option>
                                        <option value="Chalet">Chalet</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={`${style.price}`}>
                                    <p>Renter/Seller</p>

                                    <select className="form-select" aria-label="Default select example" value={rentrORseller} onChange={(e) => setRentrORseller(e.target.value)}>
                                        <option value="">Choose rentrORseller</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Sale">Sell</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-1">
                                <div className={`${style.search}`}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`${style.icon}`} onClick={handleSearch} />
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
                            <img src='../../../../img/alquds.jpeg' className='img-fluid' onClick={() => searchOnCity("Jerusalem")} />
                            <p>Jerusalem</p>
                        </div>

                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/gaza.jpeg' className='img-fluid' onClick={() => searchOnCity("Gaza")} />
                            <p>Gaza</p>
                        </div>

                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/nablus.jpeg' className='img-fluid' onClick={() => searchOnCity("Nablus")} />
                            <p>Nablus</p>
                        </div>

                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/haifa.jpeg' className='img-fluid w-100' onClick={() => searchOnCity("Haifa")} />
                            <p>Haifa</p>
                        </div>
                    </div>
                </div>
            </div>

            <Location />
            <RecentEstate />
            <DisplayHouse />
            <DisplayLand />
            <DisplayApartment />
            <DisplayStore />
            <DisplayChalet />
            <Feedback />
            <ContactUs />
        </>
    )
}
