import React, { useContext } from 'react';
import { UserContext } from '../../web/context/User';
import style from './admin.module.css';
import { Link,Outlet,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice,faPenToSquare,faBuilding,faUsers,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
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
                    <Link to="/"><FontAwesomeIcon icon={faFileInvoice} /> Info</Link>
                    <Link to="updateInfo"><FontAwesomeIcon icon={faPenToSquare} /> Update Data</Link>
                    <Link to="allEstate"><FontAwesomeIcon icon={faBuilding} /> All Estate</Link> 
                    <Link to="allUser"><FontAwesomeIcon icon={faUsers} /> All User</Link>
                <Link onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link>
            </nav>

        </div>
        <div className={`${style.data}`}>
        <Outlet />
      </div>
    </aside>
  );
};

export default Admin;
