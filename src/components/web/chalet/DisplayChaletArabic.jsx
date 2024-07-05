import React, { useContext } from 'react'
import style from '../house/DispalyH.module.css';
import { Link } from 'react-router-dom';
import { DisplayContext } from '../context/Display';
import { useQuery } from 'react-query';

export default function DisplayChaletArabic() {

    const {displayChalet} = useContext(DisplayContext);

    const getDisplayChalet = async () => {
        const result = await displayChalet();
        return result;
    }
    const {data, isLoading} = useQuery("displayChalet", getDisplayChalet);

    if (isLoading) {
        return <h1>جارٍ التحميل...</h1>
    }
    return (
        <div className='container my-5' dir='rtl'>
            <div className="d-flex justify-content-between">
                <p className={`${style.titleState}`}>حالة الشاليه</p>
                <Link to={"/ara/allChaletsAra"} className={`${style.btnSeeAll}`}>عرض الكل</Link>
            </div>
            <div className="row">
                {data.estates ? data.estates.map((estate) =>

                    <div className="col-md-3 " key={estate._id}>
                        <div className={`${style.card}`}>
                            <Link to={`/ara/ditalStateAra/${estate._id}`} className='text-decoration-none'>
                                <img src={estate.imageUrl[0]} alt='عقار' />
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

                ) : <h1>لا توجد حالة</h1>}
            </div>
        </div>
    )
}