import React, { useContext } from 'react';
import style from './Feedback.module.css';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { DisplayContext } from '../context/Display';
import 'swiper/css';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function FeedbackArabic() {
    let { displayFeedback } = useContext(DisplayContext);

    const getFeedback = async () => {
        const result = await displayFeedback();
        return result;
    }

    const { data, isLoading } = useQuery("getFeedback", getFeedback);

    if (isLoading) {
        return <h1>جارٍ التحميل...</h1>;
    }

    return (
        <div className={`container my-5 ${style.recnt}`} dir='rtl'>
            <div className="d-flex justify-content-between">
                <p className={`${style.p1}`}>التغذية الراجعة</p>
                <Link to={"/ara/addFeedbackAra"} className={`${style.btnAddFeedback}`}>إضافة تغذية راجعة</Link>
            </div>
            <div className={`${style.cardContainer}`}>
                <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    spaceBetween={150}
                    slidesPerView={2.2}
                    navigation
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                >
                    {data && data.feedbacks ? data.feedbacks.map((state) => (
                        <SwiperSlide key={state._id}>
                            <div className={`${style.card}`}>
                                <div className={`${style.cardHeader}`}>
                                    <h2>{state.userId.name}</h2>
                                </div>
                                <div className={`${style.cardBody}`}>
                                    <p>{state.statement}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )) : <h1>فارغ</h1>}
                </Swiper>
            </div>
        </div>
    );
}
