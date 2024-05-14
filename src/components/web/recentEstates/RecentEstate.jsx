import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import style from './Estate.module.css';
import { Link } from 'react-router-dom';

export default function Estate({rs,loadingR}) {
    console.log(rs);
    // const displayEstate = async () => {
    //     const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?pageNumber=1 ");
    //     // console.log(data);
    //     return data;
    // }
    // const { data, isLoading } = useQuery("displayEstate", displayEstate);
    // console.log(data);

    if (loadingR) {
        return <h1>Loading...</h1>
    }
    return (
        <div className={`container my-5 ${style.recnt}`}>
            <p>Recently Added</p>
            <div className="row">
                { rs.estates? rs.estates.map((state) =>
                    <div className={`col-md-6  ${style.item}`} key={state._id}>
                        <div className="img">
                            <Link to={`/ditalState/${state._id}`}>
                            <img src={state.imageUrl[0]}/>
                            </Link>
                            <span className={`${style.addres}`}>{state.address}</span>
                            <span className={`${style.name}`}>{state.ownerId.name}</span>
                            <span className={`${style.phone}`}>{state.ownerId.phone}</span> 
                            <span className={`${style.price}`}>${state.price}</span>
                        </div>
                    </div>

                ):<h1>null</h1>}
            </div>
        </div>
    )
}

{/* <div className="card" style={{ width: '18rem' }}>
                            <img src={state.imageUrl} className={`${style.img}`} alt="..." />
                            <div className="card-body">
                                <h4>{state.ownerId.name}</h4>
                                <p>{state.address}</p>
                                <h5 className="card-title">House</h5>
                                <p className="card-text">{state.description}</p>
                                <p>${state.price}</p>
                                <a href="#" className="btn btn-primary">Detalis</a>
                            </div>
                        </div> */}