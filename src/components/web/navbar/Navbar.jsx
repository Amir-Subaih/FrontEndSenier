import React, { useContext} from 'react'
import style from '../navbar/Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User'
export default function Navbar() {
  // const {userId}=useParams();
  const navigate=useNavigate();
  let {userToken,setUserToken,userData,setUserData,loading}=useContext(UserContext);
  
  const logout=()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null);
    navigate("/");
  }
  if(loading&&userToken){
    return <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>  
  }
  return (
  
    <nav className="navbar container navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <img src='../../../../img/logoLogin.png' alt='logo' className={`${style.logo}`}/>
    <p className={`${style.logoTitle}`}>AQ Estate</p>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-5">
        <li className="nav-item">
          <Link className={`${style.navLink}`} aria-current="page" to={"/"}>Home</Link>
        </li>
        <li className="nav-item">
          <a className={`${style.navLink}`} href="/myForm">Houses</a>
        </li>
        <li className="nav-item">
          <a className={`${style.navLink}`} href="#">Store</a>
        </li>
        <li className="nav-item">
          <a className={`${style.navLink}`} href="#">About Us</a>
        </li>
        <li className={`nav-item`}>
          <Link className={`${style.userName} `} to={'/ara'}>Ara</Link>
        </li>
        <li className="nav-item">
          <Link className={`${style.userName}`} to={'/addState'}>Add State</Link>
        </li>
        <li className="nav-item dropdown">
        {!userToken?
        <a className={`dropdown-toggle ${style.userName}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Account
        </a>
          :
          <a className={`dropdown-toggle ${style.userName}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {userData&&userData.name}  
          </a>
          }
        <ul className="dropdown-menu">
        {!userToken?
          <>
          <li><Link className={`dropdown-item ${style.login}`} to={"/login"}>Login</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><Link className={`dropdown-item ${style.login}`} to={"/register"}>Rigester</Link></li>
          </>
          :
          <>
          <li><Link className={`dropdown-item ${style.login}`} to={`/profile`}>Profile</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><Link className={`dropdown-item ${style.login}`} onClick={logout}>Logout</Link></li>
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
