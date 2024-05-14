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

export default function DetalisEstate() {

    let [loading,setLoading]=useState(true);
    const {EstateId}=useParams();
    

    const stateDetails =async ()=>{
            // setLoading(true);
            const {data}=await axios.get(`https://estatetest.onrender.com/api/estate/all/${EstateId}`);
            console.log(data);
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
    const showBathroomsBedrooms = !["Store", "Land"].includes(data.typeEstates);
  return (
    <div className='container mt-4 mb-5'>
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

    <div className={`${style.cardInformation}`}>
        <p className={`${style.gInfo}`}>General Information</p>
        <div className="info ms-3">
            <div className="row">
                <div className="col-md-3">
                <p className={`${style.infoState}`}>Published Date</p>
                <p className={`${style.infoState}`}>Advertise Status</p>
                <p className={`${style.infoState}`}>State Shape</p>
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
                    <p className={`${style.detailState}`}>{data.price}$</p>
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
                </div>

                <div className="col-md-2">
                    <p className={`${style.detailState}`}>{data.ownerId.name}</p>
                    <p className={`${style.detailState}`}>{data.ownerId.phone}</p>
                </div>
            </div>
            
        </div>
    </div>

    <div className={`${style.description}`}>
        <p className={`${style.Explanation}`}>Explanation</p>
        <p className={`${style.desc}`}>{data.description}</p>
    </div>

    </div>
    
)
}
