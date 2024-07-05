import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import style from './DispalyH.module.css';

export default function SeeAllHouse() {
    let [dataState,setDataState]=useState("");
    const [loading,setLoading] = useState(false);
    const seeAllH = async () => {
        setLoading(true);
        const  data  = await axios.get("https://estatetest.onrender.com/api/estate/all?typeEatateS=House");
        setDataState(data.data.estates);
        setLoading(false);
        // return data.data.estates;
        
    }
    // const { data, isLoading } = useQuery("see-all", seeAllH);
    useEffect(()=>{
        seeAllH();
    },[])
    console.log(dataState);
   
    let [cityName,setCityName] = useState("");
    let [typeEatateS,setTypeEatateS]=useState("");
    let [renter_seller,setRenter_seller]=useState("");
    let [minPrice,setMinPrice]=useState("");
    let [maxPrice,setMaxPrice]=useState("");
    let [minArea,setMinArea]=useState("");
    let [maxArea,setMaxArea]=useState("");

    const handelSubmit=async (e)=>{
        e.preventDefault();
        console.log("test");
        try{
            setLoading(true);
            const result=await axios.get(`https://estatetest.onrender.com/api/estate/all?cityName=${cityName}&SR=${renter_seller}&typeEatateS=House&maxprice=${maxPrice}&minprice=${minPrice}&minarea=${minArea}&maxarea=${maxArea}`);
            console.log(result);
            setDataState(result.data.estates);
            setLoading(false);
            // return result.data.estates;
        }catch(err){
            console.error(err);
        }
    }
    if (loading) {
        return <h1>Loading...</h1>
    }
    return (
        <div className='container my-5'>
            <p className={` ${style.titleState}`}>All Houses</p>

            <div className="search">
                <form onSubmit={handelSubmit}>
                    <div className={`row ${style.row}`}>
                        <div className="col-md-6">
                            <div className={`${style.locations}`}>
                                <select className="form-select" value={cityName} onChange={(e)=>setCityName(e.target.value)}>
                                    <option value="">Select Location</option>
                                    <option value="Ramallah">Ramallah</option>
                                    <option value="Tulkarm">Tulkarm</option>
                                    <option value="Nablus">Nablus</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`${style.types}`}>
                                <select className="form-select" value={typeEatateS} onChange={(e)=>setTypeEatateS(e.target.value)}>
                                    <option value="House">House</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`${style.rentORsells}`}>
                                <select className="form-select " value={renter_seller} onChange={(e)=>setRenter_seller(e.target.value)}>
                                    <option value="">renterORseller</option>
                                    <option value="Rent">Renter</option>
                                    <option value="Sale">Seller</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className={`${style.prices}`}>
                                <div>
                                    <input type="number" className="form-control" placeholder="Enter Min Price" aria-label="Price" aria-describedby="addon-wrapping" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)}/>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className={`${style.prices}`}>
                                <div>
                                    <input type="number" className=" form-control" placeholder="Enter Max Price" aria-label="Username" aria-describedby="addon-wrapping" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} />
                                </div>

                            </div>
                        </div>
                        {/* <div className="col-md-1"></div> */}

                        <div className="col-md-2">
                            <div className={`${style.areas}`}>
                                <div>
                                    <input type="number" className="ms-5 form-control" placeholder="Enter Min Area" aria-label="Username" aria-describedby="addon-wrapping" value={minArea} onChange={(e)=>setMinArea(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className={`${style.areas}`}>
                                <div>
                                    <input type="number" className="ms-5 form-control" placeholder="Enter Max Area" aria-label="Username" aria-describedby="addon-wrapping" value={maxArea} onChange={(e)=>setMaxArea(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>

                        <div className="col-md-3 mb-5">
                            <div className={`${style.btnSearch}`}>
                                <button >Search</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

                <div className="row">
                    {dataState.length ? dataState.map((estate) =>

                        <div className="col-md-3" key={estate._id}>
                            <div className={`mt-3 ${style.card}`}>
                                <Link to={`/ditalState/${estate._id}`} className=' text-decoration-none'>
                                    <img src={estate.imageUrl[0]} alt='Estate' />
                                    <p className={`${style.price}`}>{estate.price} $</p>
                                    <p className={`${style.type}`}>{estate.typeEstates}</p>
                                    <p className={`${style.address}`}>{estate.address}</p>
                                    <p className={`${style.area}`}>{estate.area} m²</p>
                                    <p className={`${style.chose}`}>{estate.typeEstateSR}</p>
                                </Link>
                            </div>
                        </div>

                    ) : <h1>State null</h1>}
                </div>
        </div>
    )
}
