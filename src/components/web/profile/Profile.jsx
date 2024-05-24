import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import style from '../profile/Profile.module.css';
import { UserContext } from '../context/User';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // استيراد Modal و Button

export default function Profile() {
  const navigate = useNavigate();
  let { loading, userToken } = useContext(UserContext);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false); // حالة عرض Modal
  let [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId') || null;
  });

  useEffect(() => {
    if(userId){
      localStorage.setItem('userId', userId);
    }
  }, [userId]);

  const handleClose = () => setShowModal(false); // إغلاق Modal

  const deleteAccount = async () => {
    if (userToken) {
      const { data } = await axios.delete(
        `https://estatetest.onrender.com/api/users/${userId}`,
        { headers: { token: userToken } }
      );
      console.log(data);
      setShowModal(false); // إغلاق Modal بعد الحذف
      setIsAccountDeleted(true); // تحديث حالة الحذف
    }
  };

  useEffect(() => {
    if (isAccountDeleted) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      navigate('/'); // إعادة التوجيه إلى الصفحة الرئيسية
      window.location.reload();
    }
  }, [isAccountDeleted, userId]);
  if (loading) {
    return <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  }

  return (
    <aside className={`${style.profile}`}>
      <div className={`${style.profileLinks}`}>
      <nav>
        <Link to="">Info</Link>

        <Link to="updateInfo">Update My Data</Link>

        <Link to="myEstate">My Estate</Link>

        <Link  onClick={() => setShowModal(true)}>Delete Account</Link> {/* فتح Modal عند الضغط */}

      </nav>

        <Modal show={showModal} onHide={handleClose}> {/* Modal لتأكيد الحذف */}
        <Modal.Header closeButton>
          <Modal.Title>Confirm account deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to delete your account?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button variant="danger" onClick={deleteAccount}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>

      </div>
      <div className={`${style.d1}`}>
        <Outlet />
      </div>
    </aside>
  )
}
