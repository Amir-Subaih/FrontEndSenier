import axios from 'axios'
import React, { useContext } from 'react'
import { UserContext } from '../context/User'
import { useQuery, useQueryClient } from 'react-query';
import style from '../house/DispalyH.module.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export default function MyEstateArabic() {
    let { userToken, userId } = useContext(UserContext);
    const queryClient = useQueryClient();

    const toggleButton = async (estateId, currentStatus) => {
        try {
            const { data } = await axios.put(
                `https://estatetest.onrender.com/api/estate/${estateId}`,
                { activated: !currentStatus },
                { headers: { token: userToken } }
            );
            console.log(data);
            queryClient.invalidateQueries("myEstate");
        } catch (error) {
            console.error(error);
            swal("خطأ", "فشل تحديث حالة العقار", "error");
        }
    };

    const myEstate = async () => {
        try {
            const { data } = await axios.get(`https://estatetest.onrender.com/api/estate/owner/${userId}`,
                { headers: { token: userToken } });
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const { data, isLoading } = useQuery("myEstate", myEstate);

    const deleteEstate = async (estateId) => {
        try {
            const { data } = await axios.delete(`https://estatetest.onrender.com/api/estate/${estateId}`,
                { headers: { token: userToken } });
            console.log(data);
            if (data.message === "success") {
                swal("تم الحذف بنجاح!", "لقد قمت بالنقر على الزر!", "success");
                queryClient.invalidateQueries("myEstate");
            }
        } catch (error) {
            console.error(error);
            swal("خطأ", "فشل حذف العقار", "error");
        }
    }

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
                {data.estate ? data.estate.map((estate) =>
                    <div className={`${style.caver1} col-md-4 mb-3`} key={estate._id}>
                        <div className={`${style.card}`}>
                            <Link to={`/ara/ditalStateAra/${estate._id}`}>
                                <img src={estate.imageUrl[0]} alt='العقار' />
                            </Link>
                            <div className={`${style.cardAra}`}>
                                <p className={`${style.price}`}>{estate.price} $</p>
                                <p className={`${style.type}`}>{estate.typeEstates}</p>
                                <p className={`${style.address}`}>{estate.address}</p>
                                <p className={`${style.area}`}>{estate.area} m²</p>
                                <p className={`${style.chose}`}>{estate.typeEstateSR}</p>
                            </div>

                            <div className={`${style.btnDeleteAra}`}>
                                <button type="button" className="btn btn-danger" onClick={() => deleteEstate(estate._id)}>حذف</button>
                            </div>

                            <div className={`${style.btnAra} App`}>
                                <button
                                    onClick={() => toggleButton(estate._id, estate.activated)}
                                    className={`toggle-button ${estate.activated ? 'active' : ''}`}
                                >
                                    {estate.activated ? 'لم يباع' : 'تم البيع'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : <h1>الحالة فارغة</h1>}
            </div>
        </div>
    )
}
