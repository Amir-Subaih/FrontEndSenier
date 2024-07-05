import React, { useContext } from 'react';
import { DisplayContext } from '../context/Display';
import { UserContext } from '../context/User';
import { useQuery } from 'react-query';
import style from './Intersting.module.css';
import { Link } from 'react-router-dom';

export default function Location() {
    const { displayEstateByLocation } = useContext(DisplayContext);
    const { userData, userToken } = useContext(UserContext);
    const location = userData?.location; // تحقق من أن userData غير فارغة
    const typeEstateLikeIt = userData?.typeEstateLikeIt;

    const getEstateByLocation = async (location, typeEstateLikeIt) => {
        const result = await displayEstateByLocation(location, typeEstateLikeIt);
        return result.estates.slice(0, 4);
    };

    const { data, isLoading, error } = useQuery(
        ["data", location, typeEstateLikeIt],
        () => getEstateByLocation(location, typeEstateLikeIt)
    );

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        console.error("Error fetching data:", error);
        return <h1>Error: {error.message}</h1>;
    }

    // تحقق من نوع البيانات قبل محاولة العرض
    const estatesData = data && Array.isArray(data) ? data : [];

    return (
        <div className={`container my-5 ${style.recnt}`}>
            {userToken && userData?.location && userData?.typeEstateLikeIt && (
                <p>Interesting</p>
            )}
            <div className="row">
                {estatesData.length > 0 ? estatesData.map((state) => (
                    <div className={`col-md-3 ${style.item}`} key={state._id}>
                        <div className="img">
                            <Link to={`/ditalState/${state._id}`}>
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
