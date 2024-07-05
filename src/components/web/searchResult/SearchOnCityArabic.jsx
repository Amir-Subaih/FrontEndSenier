import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import style from '../house/DispalyH.module.css';

export default function SearchOnCityArabic() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const cityName = searchParams.get('cityName');
    let [dataSearch, setDataSearch] = useState([]);
    let [loading, setLoading] = useState(false);

    const fetchSearchResults = async () => {
        setLoading(true);
        const { data } = await axios.get(`https://estatetest.onrender.com/api/estate/all?cityName=${cityName}`);
        console.log(data);
        setDataSearch(data.estates);
        setLoading(false);
        return data;
    };

    useEffect(() => {
        fetchSearchResults();
    }, []);

    if (loading) {
        return <h1>جاري التحميل...</h1>;
    }

    return (
        <div className="container my-5" dir='rtl'>
            <div className="row">
                {dataSearch.length ? (
                    dataSearch.map((estate) => (
                        <div className="col-md-3" key={estate._id}>
                            <div className={`mt-3 ${style.card}`}>
                                <Link to={`/ara/ditalStateAra/${estate._id}`} className='text-decoration-none'>
                                    <img src={estate.imageUrl[0]} alt='Estate' />
                                    
                                    <div className={`${style.cardAra}`}>
                                        <p className={`${style.price}`}>{estate.price} $</p>
                                        <p className={`${style.type}`}>{estate.typeEstates}</p>
                                        <p className={`${style.address}`}>{estate.address}</p>
                                        <p className={`${style.area}`}>{estate.area} m²</p>
                                        <p className={`${style.chose}`}>{estate.typeEstateSR}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>لا توجد نتائج</h1>
                )}
            </div>
        </div>
    );
}
