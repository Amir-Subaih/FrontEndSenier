import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from '../house/DispalyH.module.css';

export default function SeeAllChaletArabic() {
    let [dataState, setDataState] = useState("");
    const [loading, setLoading] = useState(false);

    const seeAllChalet = async () => {
        setLoading(true);
        const data = await axios.get("https://estatetest.onrender.com/api/estate/all?typeEatateS=Chalet");
        setDataState(data.data.estates);
        setLoading(false);
    }

    useEffect(() => {
        seeAllChalet();
    }, []);

    console.log(dataState);

    let [cityName, setCityName] = useState("");
    let [typeEatateS, setTypeEatateS] = useState("");
    let [renter_seller, setRenter_seller] = useState("");
    let [minPrice, setMinPrice] = useState("");
    let [maxPrice, setMaxPrice] = useState("");
    let [minArea, setMinArea] = useState("");
    let [maxArea, setMaxArea] = useState("");

    const handelSubmit = async (e) => {
        e.preventDefault();
        console.log("test");
        try {
            setLoading(true);
            const result = await axios.get(`https://estatetest.onrender.com/api/estate/all?cityName=${cityName}&SR=${renter_seller}&typeEatateS=House&maxprice=${maxPrice}&minprice=${minPrice}&minarea=${minArea}&maxarea=${maxArea}`);
            console.log(result);
            setDataState(result.data.estates);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return <h1>جارٍ التحميل...</h1>;
    }

    return (
        <div className='container my-5' dir='rtl'>
            <p className={` ${style.titleState}`}>كل الشاليهات</p>

            <div className="search">
                <form onSubmit={handelSubmit}>
                    <div className={`row ${style.row}`}>
                        <div className="col-md-6">
                            <div className={`${style.locations}`}>
                                <select className="form-select" value={cityName} onChange={(e) => setCityName(e.target.value)}>
                                    <option value="">اختر الموقع</option>
                                    <option value="Ramallah">رام الله</option>
                                    <option value="Tulkarm">طولكرم</option>
                                    <option value="Nablus">نابلس</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`${style.types}`}>
                                <select className="form-select" value={typeEatateS} onChange={(e) => setTypeEatateS(e.target.value)}>
                                    <option value="House">منزل</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`${style.rentORsells}`}>
                                <select className="form-select " value={renter_seller} onChange={(e) => setRenter_seller(e.target.value)}>
                                    <option value="">مؤجر أو بائع</option>
                                    <option value="Rent">مؤجر</option>
                                    <option value="Sale">بائع</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className={`${style.prices}`}>
                                <div>
                                    <input type="number" className="form-control" placeholder="أدخل الحد الأدنى للسعر" aria-label="Price" aria-describedby="addon-wrapping" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className={`${style.prices}`}>
                                <div>
                                    <input type="number" className=" form-control" placeholder="أدخل الحد الأقصى للسعر" aria-label="Username" aria-describedby="addon-wrapping" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className={`${style.areas}`}>
                                <div>
                                    <input type="number" className="ms-5 form-control" placeholder="أدخل الحد الأدنى للمساحة" aria-label="Username" aria-describedby="addon-wrapping" value={minArea} onChange={(e) => setMinArea(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className={`${style.areas}`}>
                                <div>
                                    <input type="number" className="ms-5 form-control" placeholder="أدخل الحد الأقصى للمساحة" aria-label="Username" aria-describedby="addon-wrapping" value={maxArea} onChange={(e) => setMaxArea(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-5">
                            <div className={`${style.btnSearch}`}>
                                <button>بحث</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="row">
                {dataState.length ? dataState.map((estate) =>
                    <div className="col-md-3" key={estate._id}>
                        <div className={`mt-3 ${style.card}`}>
                            <Link to={`/ara/ditalStateAra/${estate._id}`}>
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
                ) : <h1>لا توجد عقارات</h1>}
            </div>
        </div>
    )
}
