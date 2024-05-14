import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/User'
import { useQuery } from 'react-query';
import style from '../house/DispalyH.module.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export default function MyEstate() {
    let { userToken } = useContext(UserContext);
    const [userId, setUserId] = useState(() => {
        // قم بتهيئة userId من التخزين المحلي أو اجعلها تساوي القيمة الافتراضية null إذا لم تكن موجودة
        return localStorage.getItem('userId') || null;
    });

    useEffect(() => {
        if (userId) {
            // قم بتخزين userId في التخزين المحلي
            localStorage.setItem('userId', userId);
        }
    }, [userId]);

    
    const myEstate = async () => {
        try
        {   
          const {data} = await axios.get(`https://estatetest.onrender.com/api/estate/owner/${userId}`,
          { headers: { token: userToken } });
          return data;
        }
        
        catch(error)
        {
          console.log(error);
        }
    }
    const { data, isLoading } = useQuery("myEstate", myEstate);
    console.log(data);

    const deleteEstate = async (estateId) => {
      const { data } = await axios.delete(`https://estatetest.onrender.com/api/estate/${estateId}`,
      { headers: { token: userToken } });
      console.log(data);
      if (data.message === "success")
      {
        swal("تم الحذف بنجاح!", "You clicked the button!", "success");
        window.location.reload();
      }
    }
    if (isLoading)
    {
        return <h1>جار التحميل...</h1>
    }

  return (
    <div className='container my-5' dir='rtl'>
      <div className="row">
        {data.estate.length ? data.estate.map((estate) =>
          <div className="col-md-3" key={estate._id}>
            <div className={`mt-3 ${style.card}`}>
              <Link to={`/ara/ditalStateArabic/${estate._id}`}>
              <img src={estate.imageUrl[0]} alt='Estate'/>
              </Link>
              <p className={`${style.price}`}>{estate.price} $</p>
              <p className={`${style.type}`}>{estate.typeEstates}</p>
              <p className={`${style.address}`}>{estate.address}</p>
              <p className={`${style.area}`}>{estate.area} m²</p>
              <div className={`${style.btnDeleteA}`}>
              <p className={`${style.chose}`}>{estate.typeEstateSR}</p>
              <button type="button" className="btn btn-danger" onClick={() => deleteEstate(estate._id)}>حذف</button>
              </div>
            </div>
          </div>
        ) : <h1>لا يوجد عقارات</h1>}
      </div>
    </div>
  )
}
