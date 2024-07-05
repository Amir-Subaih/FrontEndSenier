import axios from 'axios';
import React, { useContext } from 'react';
import { UserContext } from '../context/User';
import { useQuery } from 'react-query';
import style from '../house/DispalyH.module.css';
import { Link } from 'react-router-dom';

export default function UpdateMyEstateArabic() {
    let { userToken, userId } = useContext(UserContext);

    const myEstate = async () => {
        try {
            const { data } = await axios.get(`https://estatetest.onrender.com/api/estate/owner/${userId}`, {
                headers: { token: userToken }
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const { data, isLoading } = useQuery("myEstate", myEstate);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">جارٍ التحميل...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='container my-5' dir='rtl'>
            <div className="row">
                {data.estate ? (
                    data.estate.map((estates) => (
                        <div className="col-md-4 mb-3" key={estates._id}>
                            <div className={`${style.card}`}>
                                <Link to={`/ara/ditalStateAra/${estates._id}`}>
                                    <img src={estates.imageUrl[0]} alt='عقار' />
                                </Link>
                                <div className={`${style.cardAra}`}>
                                    <p className={`${style.price}`}>{estates.price} $</p>
                                    <p className={`${style.type}`}>{estates.typeEstates}</p>
                                    <p className={`${style.address}`}>{estates.address}</p>
                                    <p className={`${style.area}`}>{estates.area} m²</p>
                                    <p className={`${style.chose}`}>{estates.typeEstateSR}</p>
                                </div>
                                <div className={`${style.btnDeleteAra}`}>
                                    <Link to={`/ara/formUpdateAra/${estates._id}`}>
                                        <button type="button" className="btn btn-info fw-bold">تحديث</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>الحالة فارغة</h1>
                )}
            </div>
        </div>
    );
}
