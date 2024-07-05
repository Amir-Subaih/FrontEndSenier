import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import style from '../house/DispalyH.module.css';
import './DetalisEstate.css';
import 'swiper/css';
import { Navigation,Autoplay,Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Swiper,SwiperSlide} from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
//Map // for import in terminal: npm install leaflet react-leaflet --legacy-peer-deps
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
export default function DetalisEstate() {

    let [loading,setLoading]=useState(true);
    const {EstateId}=useParams();
    

    const stateDetails =async ()=>{
            // setLoading(true);
            const {data}=await axios.get(`https://estatetest.onrender.com/api/estate/all/${EstateId}`);
            // console.log(data);
            setLoading(false);
            return data.estate;
    }
    const {data,isLoading} = useQuery("DetalisEstate",stateDetails);

    console.log(data);
    
    if(isLoading) {
        return <h1>Loading....</h1>
    }
    if(loading) {
        return <h1>Loading....</h1>
    }
    const showBathroomsBedrooms = ["House", "Apartment","Chalet"].includes(data.typeEstates);
    const showStore=["Store","Land"].includes(data.typeEstates);
    const showRenter=["Rent"].includes(data.typeEstateSR);
    const showSell=["Sale"].includes(data.typeEstateSR);
    const notShowStores=!["Store","Land","Chalet"].includes(data.typeEstates);
    const showChaletRent=["Chalet"].includes(data.typeEstates);

  return (

    <div className='w95 container mt-4 mb-5'>
        <div className="detal my-3 ">
        <div className="location d-flex ">
        <FontAwesomeIcon icon={faLocationDot} className={`${style.iconLocation}`}/>
        <p className={`${style.location}`}>{data.address}</p>
        </div>
        {/* <p className={`${style.price}`}>{data.price}$</p> */}
        </div>
    <Swiper
    modules={[Navigation,Autoplay,Pagination]}
    spaceBetween={70}
    slidesPerView={2.2}
    navigation
    loop={false}
    // autoplay={{
    //     delay:2000
    // }}
    pagination={{
        clickable: true,
        el:'.swiper-custom-pagination',
    }}
    >
    <div className={`${style.disImg}`}>
    {data.imageUrl.map((imgs) => (
        <SwiperSlide className={`${style.imageItem}`} key={imgs}>
        <img src={imgs}  />
        </SwiperSlide>
    ))}
    </div>
    </Swiper>

    {data.activated===false?
    <div className={`bg-danger-subtle ${style.cardInformation}`}>
        <p className={`${style.gInfo}`}>General Information</p>
        <div className="info ms-3">
            <div className="row">
                <div className="col-md-3">
                <p className={`${style.infoState}`}>Published Date</p>
                <p className={`${style.infoState}`}>Advertise Estate type</p>
                <p className={`${style.infoState}`}>Estate type</p>
                <p className={`${style.infoState}`}>Net M² </p>
                <p className={`${style.infoState}`}>Price</p>
                {showBathroomsBedrooms&&
                <>
                <p className={`${style.infoState}`}>Count Bedrooms</p>
                <p className={`${style.infoState}`}>Count Bathrooms</p>
                </>
                }
                </div>

                <div className="col-md-4">
                    <p className={`${style.detailState}`}>{data.createdAt}</p>
                    <p className={`${style.detailState}`}>{data.typeEstateSR}</p>
                    <p className={`${style.detailState}`}>{data.typeEstates}</p>
                    <p className={`${style.detailState}`}>{data.area} M²</p>

                    {showRenter&&notShowStores&&
                    <p className={`${style.detailState}`}>{data.price}$ Per Month</p>
                    }
                    {showChaletRent&&showRenter&&
                    <p className={`${style.detailState}`}>{data.price}$ In Day</p>
                    }
                    {showSell&&
                    <p className={`${style.detailState}`}>{data.price}$</p>
                    }
                    {showStore&&showRenter&&
                    <p className={`${style.detailState}`}>{data.price}$ Per Year</p>
                    }


                    {showBathroomsBedrooms&&
                    <>
                    <p className={`${style.detailState}`}>{data.bedrooms}</p>
                    <p className={`${style.detailState}`}>{data.bathrooms}</p>
                    </>
                    }
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-2">
                    <p className={`${style.infoState}`}>Owner Name</p>
                    <p className={`${style.infoState}`}>Owner Number</p>
                    <p className={`${style.infoState}`}>Property Condition</p>
                </div>

                <div className="col-md-2">
                    <p className={`${style.detailState}`}>{data.ownerId.name}</p>
                    <p className={`${style.detailState}`}>{data.ownerId.phone}</p>
                    <p className={`${style.detailState}`}>{data.activated? "Not Sold":" Sold"}</p>
                </div>
            </div>
            
        </div>
    </div>
    :
    <div className={`bg-primary-subtle ${style.cardInformation}`}>
        <p className={`${style.gInfo}`}>General Information</p>
        <div className="info ms-3">
            <div className="row">
                <div className="col-md-3">
                <p className={`${style.infoState}`}>Published Date</p>
                <p className={`${style.infoState}`}>Current Status</p>
                <p className={`${style.infoState}`}>Estate type</p>
                <p className={`${style.infoState}`}>Net M² </p>
                <p className={`${style.infoState}`}>Price</p>
                {showBathroomsBedrooms&&
                <>
                <p className={`${style.infoState}`}>Count Bedrooms</p>
                <p className={`${style.infoState}`}>Count Bathrooms</p>
                </>
                }
                </div>

                <div className="col-md-4">
                    <p className={`${style.detailState}`}>{data.createdAt}</p>
                    <p className={`${style.detailState}`}>{data.typeEstateSR}</p>
                    <p className={`${style.detailState}`}>{data.typeEstates}</p>
                    <p className={`${style.detailState}`}>{data.area} M²</p>

                    {showRenter&&notShowStores&&
                    <p className={`${style.detailState}`}>{data.price}$ Per Month</p>
                    }
                    {showChaletRent&&showRenter&&
                    <p className={`${style.detailState}`}>{data.price}$ In Day</p>
                    }
                    {showSell&&
                    <p className={`${style.detailState}`}>{data.price}$</p>
                    }
                    {showStore&&showRenter&&
                    <p className={`${style.detailState}`}>{data.price}$ Per Year</p>
                    }


                    {showBathroomsBedrooms&&
                    <>
                    <p className={`${style.detailState}`}>{data.bedrooms}</p>
                    <p className={`${style.detailState}`}>{data.bathrooms}</p>
                    </>
                    }
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-2">
                    <p className={`${style.infoState}`}>Owner Name</p>
                    <p className={`${style.infoState}`}>Owner Number</p>
                    <p className={`${style.infoState}`}>Availability</p>
                </div>

                <div className="col-md-2">
                    <p className={`${style.detailState}`}>{data.ownerId.name}</p>
                    <p className={`${style.detailState}`}>{data.ownerId.phone}</p>
                    <p className={`${style.detailState}`}>{data.activated? "Not Sold":" Sold"}</p>
                </div>
            </div>
            
        </div>
    </div>
    }

    <div className={`${style.description}`}>
        <p className={`${style.Explanation}`}>Explanation</p>
        <p className={`${style.desc}`}>{data.description}</p>
    </div>
    
    <div className={`${style.map}`}>
        <p className={`${style.Explanation}`}>Location</p>
        {data.latitude&&data.longitude&&(
                <MapContainer center={[data.latitude, data.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[data.latitude, data.longitude]}>
                    <Popup>
                        You are here: <br /> Latitude: {data.latitude}, Longitude: {data.longitude}
                    </Popup>
                    </Marker>
                </MapContainer>
            )}
    </div>
    </div>
    
)
}
