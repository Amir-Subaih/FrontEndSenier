import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import style from './Estate.module.css';
import { Link } from 'react-router-dom';

export default function Estate({ rs, loadingR }) {
    console.log(rs);

    if (loadingR) {
        return <h1>جارٍ التحميل...</h1>
    }
    return (
        <div className={`container my-5 ${style.recnt}`} dir='rtl'>
            <p className={`${style.p1}`}>تمت إضافتها مؤخرًا</p>
            <div className="row">
                {rs.estates ? rs.estates.map((state) =>
                    <div className={`col-md-6  ${style.item}`} key={state._id}>
                        <div className="img">
                            <Link to={`/ara/ditalStateArabic/${state._id}`}>
                                <img src={state.imageUrl[0]} alt="عقار" />
                            </Link>
                            <span className={`${style.addres}`}>{state.address}</span>
                            <span className={`${style.name}`}>{state.ownerId.name}</span>
                            <span className={`${style.phone}`}>{state.ownerId.phone}</span> 
                            <span className={`${style.price}`}>${state.price}</span>
                        </div>
                    </div>
                ) : <h1>فارغ</h1>}
            </div>
        </div>
    )
}
