import React, { useContext} from 'react';
import style from './adminNav.module.css';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User'
export default function Navbar() {
  // const {userId}=useParams();
  const navigate=useNavigate();
  let {userToken,setUserToken,setUserData,loading,setIsAdmin}=useContext(UserContext);
  
  const logout=()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null);
    setIsAdmin(false);
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
  
    <nav className={`${style.nav1}`}>
      <img src='../../../../img/logoLogin.png' alt='logo' className={`${style.logo}`}/>
      <p className={`${style.logoTitle}`}>AQ Estate</p>
    </nav>
  
  )
      }
