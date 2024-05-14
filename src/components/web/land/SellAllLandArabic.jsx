import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from '../house/DispalyH.module.css';

export default function SeeAllLand() {
    let [dataState, setDataState] = useState([]);
    const seeAllL = async () => {
        const data = await axios.get("https://estatetest.onrender.com/api/estate/house?typeEatateS=Land");
        setDataState(data.data.estates);
        // return data;
    }
    useEffect(()=>{
        seeAllL();
    },[]);

    let [cityName, setCityName] = useState("");
    let [typeEatateS, setTypeEatateS] = useState("");
    let [SR, setSR] = useState("");
    // let [price,setPrice]=useState("");
    // let [area,setArea]=useState("");

    const handelSubmit = async (e) => {
        e.preventDefault();
        console.log("test");
        try{
            const resultSearch = await axios.get(`https://estatetest.onrender.com/api/estate/all?cityName=${cityName}&SR=${SR}&typeEatateS=Land&maxprice=500000&minprice=0`);
            setDataState(resultSearch.data.estates);
            console.log(resultSearch);
            // return data;
        } catch(err) {
            console.error(err);
        }
    }
    // if (isLoading) {
    //     return <h1>Loading...</h1>
    // }
    return (
        <div className='container my-5' dir='rtl'>
            <p className={` ${style.titleState}`}>كل الأراضي</p>

            <div className="search">
                <form onSubmit={handelSubmit}>
                    <div className={`row ${style.row}`}>
                        <div className="col-md-6">
                            <div className={`${style.locations}`}>
                                <select className="form-select" value={cityName} onChange={(e)=>setCityName(e.target.value)}>
                                    <option value="">اختر الموقع</option>
                                    <option value="Ramallah">رام الله</option>
                                    <option value="Tulkarm">طولكرم</option>
                                    <option value="Nablus">نابلس</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`${style.types}`}>
                                <select className="form-select" value={typeEatateS} onChange={(e)=>setTypeEatateS(e.target.value)}>
                                    <option value="Land">أرض</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`${style.rentORsells}`}>
                                <select className="form-select " value={SR} onChange={(e)=>setSR(e.target.value)}>
                                    <option value="">مستأجر أو بائع</option>
                                    <option value="Rent">مستأجر</option>
                                    <option value="Sale">بائع</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className={`${style.prices}`}>
                                <select className="form-select ">
                                    <option value="">السعر</option>
                                    <option value="House">0-500$</option>
                                    <option value="Apartment">500-10000$</option>
                                    <option value="Apartment">10000-500000$</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`${style.areas}`}>
                                <select className="form-select ">
                                    <option value="">المساحة (متر مربع)</option>
                                    <option value="House">10-150 م²</option>
                                    <option value="Apartment">150-250 م²</option>
                                    <option value="Apartment">250-350 م²</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3 mb-5">
                            <div className={`${style.btnSearch}`}>
                                <button >بحث</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="row">
                {dataState ? dataState.map((estate) =>

                    <div className="col-md-3" key={estate._id}>
                        <div className={`my-4 ${style.card}`}>
                            <Link to={`/ara/ditalStateArabic/${estate._id}`}>
                                <img src={estate.imageUrl[0]} alt='Estate' />
                                <p className={`${style.price}`}>{estate.price} $</p>
                                <p className={`${style.type}`}>{estate.typeEstates}</p>
                                <p className={`${style.address}`}>{estate.address}</p>
                                <p className={`${style.area}`}>{estate.area} م²</p>
                                <p className={`${style.chose}`}>{estate.typeEstateSR}</p>
                            </Link>
                        </div>
                    </div>

                ) : <h1>الحالة فارغة</h1>}
            </div>
        </div>
    )
}
