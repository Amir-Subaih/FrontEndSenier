import React, { useContext } from 'react';
import { DisplayContext } from '../context/Display';
import { UserContext } from '../context/User';
import { useQuery } from 'react-query';
import style from './Intersting.module.css';
import { Link } from 'react-router-dom';

export default function LocationArabic() {
    const { displayEstateByLocation } = useContext(DisplayContext);
    const { userData, userToken } = useContext(UserContext);
    const location = userData?.location; // Ensure userData is not empty
    const typeEstateLikeIt = userData?.typeEstateLikeIt;

    const getEstateByLocation = async (location, typeEstateLikeIt) => {
        const result = await displayEstateByLocation(location, typeEstateLikeIt);
        return result.estates.slice(0, 4); // Get only the first 4 estates
    };

    const { data, isLoading, error } = useQuery(
        ["data", location, typeEstateLikeIt],
        () => getEstateByLocation(location, typeEstateLikeIt)
    );

    if (isLoading) {
        return <h1>جار التحميل...</h1>;
    }

    if (error) {
        console.error("حدث خطأ في جلب البيانات:", error);
        return <h1>خطأ: {error.message}</h1>;
    }

    // Ensure data type before attempting to display
    const estatesData = data && Array.isArray(data) ? data : [];

    return (
        <div className={`container my-5 ${style.recnt}`} dir='rtl'>
            {userToken && userData?.location && userData?.typeEstateLikeIt && (
                <p className={`${style.recntAra}`}>مثير للاهتمام</p>
            )}
            <div className="row">
                {estatesData.length > 0 ? estatesData.map((state) => (
                    <div className={`col-md-3 ${style.item}`} key={state._id}>
                        <div className="img">
                            <Link to={`/ara/ditalStateAra/${state._id}`}>
                                <img src={state.imageUrl[0]} alt="Estate" />
                            </Link>
                            <span className={`${style.addres}`}>{state.address}</span>
                            <span className={`${style.name}`}>{state.ownerId.name}</span>
                            <span className={`${style.phone}`}>{state.ownerId.phone}</span>
                            <span className={`${style.price}`}>${state.price}</span>
                        </div>
                    </div>
                )) : null}
            </div>
        </div>
    );
}
