import React, { useContext } from 'react'
import style from '../navbar/Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User'

export default function Navbar() {
  const navigate = useNavigate();
  let { userToken, setUserToken, userData, setUserData, loading } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null);
    navigate("/ara");
  }

  if (loading && userToken) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <nav className="navbar container navbar-expand-lg bg-body-tertiary" dir='rtl'>
      <div className="container-fluid">
        <img src='../../../../img/logoLogin.png' alt='logo' className={`${style.logo}`} />
        <p className={`${style.logoTitle}`}>عقار</p>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className={`ml-1 navbar-nav mb-2 mb-lg-0 gap-5`}>
            <li className="nav-item">
              <Link className={`${style.navLink}`} aria-current="page" to={"/ara"}>الصفحة الرئيسية</Link>
            </li>
            <li className="nav-item">
              <a className={`${style.navLink}`} href="/myForm">المنازل</a>
            </li>
            <li className="nav-item">
              <a className={`${style.navLink}`} href="#">المتجر</a>
            </li>
            <li className="nav-item">
              <a className={`${style.navLink}`} href="#">من نحن</a>
            </li>
            <li className={`${style.u1} nav-item`}>
              <Link className={`${style.userName} `} to={'/'}>Eng</Link>
            </li>
            <li className={`nav-item`}>
              <Link className={`${style.userName} `} to={'/ara/addStateArabic'}>إضافة عقار</Link>
            </li>
            <li className="nav-item dropdown">
              {!userToken ?
                <a className={`dropdown-toggle ${style.userName}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  الحساب
                </a>
                :
                <a className={`dropdown-toggle ${style.userName}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userData && userData.name}
                </a>
              }
              <ul className="dropdown-menu">
                {!userToken ?
                  <>
                    <li><Link className={`dropdown-item ${style.login}`} to={"/ara/loginArabic"}>تسجيل الدخول</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className={`dropdown-item ${style.login}`} to={"/ara/registerArabic"}>تسجيل</Link></li>
                  </>
                  :
                  <>
                    <li><Link className={`dropdown-item ${style.login}`} to={`/ara/profileArabic`}>الملف الشخصي</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className={`dropdown-item ${style.login}`} onClick={logout}>تسجيل الخروج</Link></li>
                  </>
                }

              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}
