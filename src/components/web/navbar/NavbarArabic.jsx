import React, { useContext } from 'react';
import style from '../navbar/Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHouse, faHouseCrack, faStore, faAddressCard, 
    faPlus, faPenToSquare, faUserTie, faIdCard, 
    faRightFromBracket, faRightToBracket,faLanguage
} from '@fortawesome/free-solid-svg-icons';

export default function NavbarArabic() {
    const navigate = useNavigate();
    let { userToken, setUserToken, userData, setUserData, loading } = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem('userToken');
        setUserToken(null);
        setUserData(null);
        navigate("/ara");
    };

    if (loading && userToken) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">جار التحميل...</span>
                </div>
            </div>
        );
    }

    const checkAddState = () => {
        if (userToken) {
            navigate("/ara/addStateAra");
        } else {
            navigate("/ara/loginAra");
        }
    };

    return (
        <nav className="navbar container navbar-expand-lg bg-body-tertiary" dir='rtl'>
            <div className="container-fluid">
                <img src='../../../../img/logoLogin.png' alt='logo' className={`${style.logo}`} />
                <p className={`${style.logoTitle}`}>AQ Estate</p>

                <div className={` ${style.navLinkAra} collapse navbar-collapse`} id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-5">
                        <li className="nav-item">
                            <Link className={` ${style.navLink}`} aria-current="page" to={"/ara"}><FontAwesomeIcon icon={faHouse} /> الصفحة الرئيسية</Link>
                        </li>
                        <li className="nav-item">
                            <a className={`${style.navLink}`} href="/ara/allHouseAra"><FontAwesomeIcon icon={faHouseCrack} /> البيوت</a>
                        </li>
                        <li className="nav-item">
                            <a className={`${style.navLink}`} href="/ara/allStoresAra"><FontAwesomeIcon icon={faStore} /> المتجر</a>
                        </li>
                        <li className="nav-item">
                            <a className={`${style.navLink}`} href="#"><FontAwesomeIcon icon={faAddressCard} /> حولنا</a>
                        </li>
                        <li className={`${style.u1} nav-item`}>
                         <Link className={`${style.userName} `} to={'/'}><FontAwesomeIcon icon={faLanguage} /> Eng</Link>
                        </li>
                        <li className="nav-item">
                            <a className={`${style.userName}`} onClick={checkAddState}><FontAwesomeIcon icon={faPlus} /> إضافة عقار</a>
                        </li>
                        <li className="nav-item dropdown">
                            {!userToken ?
                                <a className={`dropdown-toggle ${style.userName}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon icon={faUserTie} /> الحساب
                                </a>
                                :
                                <a className={`dropdown-toggle ${style.userName}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon icon={faUserTie} /> {userData && userData.name}
                                </a>
                            }
                            <ul className="dropdown-menu">
                                {!userToken ?
                                    <>
                                        <li><Link className={`dropdown-item ${style.login}`} to={"/ara/loginAra"}><FontAwesomeIcon icon={faRightToBracket} /> تسجيل الدخول</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className={`dropdown-item ${style.login}`} to={"/ara/registerAra"}><FontAwesomeIcon icon={faPenToSquare} /> التسجيل</Link></li>
                                    </>
                                    :
                                    <>
                                        <li><Link className={`dropdown-item ${style.login}`} to={`/ara/profileAra`}><FontAwesomeIcon icon={faIdCard} /> الملف الشخصي</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className={`dropdown-item ${style.login}`} onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /> تسجيل الخروج</Link></li>
                                    </>
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
