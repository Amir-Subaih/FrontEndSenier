import React from 'react';
import style from './DisplayFeedback.module.css';
import { Link } from 'react-router-dom';

export default function Feedback({ df, loadingF }) {
    console.log(df);

    if (loadingF) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className={`container my-5 ${style.recnt}`}>
            <div className="d-flex justify-content-between">
                <p className={`${style.p1}`}>Feedback</p>
                <Link to={"/addFeedback"} className={`${style.btnAddFeedback}`}>Add Feedback</Link>
            </div>
            <div cclassName={`${style.cardContainer}`}>
                <div className="row">
                    {df && df.feedbacks ? df.feedbacks.map((state) =>
                        <div className="col-md-3 " key={state._id}>
                            <div className={`${style.card}`}>
                                <div className={`${style.cardHeader}`}>
                                    <h2>{state.userId.name}</h2>
                                </div>
                                <div className={`${style.cardBody}`}>
                                    <p>{state.statement}</p>
                                </div>
                            </div>
                        </div>
                    ) : <h1>Empty</h1>}
                </div>
            </div>
        </div>
    );
}


