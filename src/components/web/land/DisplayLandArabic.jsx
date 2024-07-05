import React, { useContext } from 'react';
import style from '../house/DispalyH.module.css';
import { Link } from 'react-router-dom';
import { DisplayContext } from '../context/Display';
import { useQuery } from 'react-query';

export default function DisplayLandArabic() {

    let { displayLand } = useContext(DisplayContext);

    const getDisplayLand = async () => {
        const result = await displayLand();
        return result;
    }

    const { data, isLoading } = useQuery("displayLand", getDisplayLand);

    if (isLoading) {
        return <h1>جار التحميل...</h1>
    }

    return (
        <div className='container my-5' dir='rtl'>
            <div className="d-flex justify-content-between">
                <p className={`${style.titleState}`}>حالات الأراضي</p>
                <Link to={"/ara/allLandsAra"} className={`${style.btnSeeAll}`}>عرض الكل</Link>
            </div>
            <div className="row">
                {data.estates ? data.estates.map((estate) => (
                    <div className="col-md-3" key={estate._id}>
                        <div className={`${style.card}`}>
                            <Link to={`/ara/ditalStateAra/${estate._id}`} className='text-decoration-none'>
                                <img src={estate.imageUrl[0]} alt='Estate' />
                                <div className={`${style.cardAra}`}>
                                    <p className={`${style.price}`}>{estate.price} $</p>
                                    <p className={`${style.type}`}>{estate.typeEstates}</p>
                                    <p className={`${style.address}`}>{estate.address}</p>
                                    <p className={`${style.area}`}>{estate.area} م²</p>
                                    <p className={`${style.chose}`}>{estate.typeEstateSR}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )) : <h1>لا توجد حالات</h1>}
            </div>
        </div>
    )
}
