
import React from 'react'
import style from '../house/DispalyH.module.css';
import { Link } from 'react-router-dom';

export default function DisplayLand({ sLand, loadingL }) {

    if (loadingL) {
        return <h1>Loading...</h1>
    }
    return (
        <div className='container my-5'>
            <div className="d-flex justify-content-between">
                <p className={`${style.titleState}`}>Land State</p>
                <Link to={"/allLand"} className={`${style.btnSeeAll}`}>See All</Link>
            </div>
            <div className="row">
                {sLand.estates ? sLand.estates.map((estate) =>

                    <div className="col-md-3" key={estate._id}>
                        <div className={`${style.card}`}>
                            <Link to={`/ditalState/${estate._id}`} className='text-decoration-none'>
                                <img src={estate.imageUrl[0]} alt='Estate' />
                                <p className={`${style.price}`}>{estate.price} $</p>
                                <p className={`${style.type}`}>{estate.typeEstates}</p>
                                <p className={`${style.address}`}>{estate.address}</p>
                                <p className={`${style.area}`}>{estate.area} m²</p>
                                <p className={`${style.chose}`}>{estate.typeEstateSR}</p>
                            </Link>
                        </div>
                    </div>

                ) : <h1>State null</h1>}
            </div>
        </div>
    )
}
