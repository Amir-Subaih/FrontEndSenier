import React, { useContext } from 'react';
import style from './Estate.module.css';
import { Link } from 'react-router-dom';
import { DisplayContext } from '../context/Display';
import { useQuery } from 'react-query';

export default function RecentEstateArabic() {
    const { displayRecentEstate } = useContext(DisplayContext);

    const displayRecent = async () => {
        const result = await displayRecentEstate();
        return result;
    };

    const { data, isLoading } = useQuery("displayEstate", displayRecent);

    if (isLoading) {
        return <h1>جارٍ التحميل...</h1>;
    }

    return (
        <div className={`container my-5 ${style.recnt}`} dir='rtl'>
            <p className={`${style.recntAra}`}>العقارات المضافة حديثًا</p>
            <div className="row">
                {data.estates ? (
                    data.estates.map((state) => (
                        <div className={`col-md-6 ${style.item}`} key={state._id}>
                            <div className="img">
                                <Link to={`/ara/ditalStateAra/${state._id}`}>
                                    <img src={state.imageUrl[0]} alt="عقار" />
                                </Link>
                                <span className={`${style.addres}`}>{state.address}</span>
                                <span className={`${style.name}`}>{state.ownerId.name}</span>
                                <span className={`${style.phone}`}>{state.ownerId.phone}</span>
                                <span className={`${style.price}`}>${state.price}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>لا توجد بيانات</h1>
                )}
            </div>
        </div>
    );
}
