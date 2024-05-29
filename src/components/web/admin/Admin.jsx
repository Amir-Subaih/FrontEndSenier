import React, { useContext } from 'react';
import { UserContext } from '../context/User';
import style from './admin.module.css';
import { Link,Outlet,useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { setUserToken,setUserData,setIsAdmin } = useContext(UserContext);
  const navigate=useNavigate();

  const logout=()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null);
    setIsAdmin(false);
    navigate("/");
  }

  return (
    <aside className={`${style.admin}`}>
         <div className={`${style.adminLinks}`}>
            <nav>
                    <Link to="/">Info</Link>
                    <Link to="updateInfo"> Update Data</Link>
                    <Link to="allEstate"> All Estate</Link> 
                <Link onClick={logout}>Logout</Link>
            </nav>

        </div>
        <div className={`${style.data}`}>
        <Outlet />
      </div>
    </aside>
  );
};

export default AdminPage;
