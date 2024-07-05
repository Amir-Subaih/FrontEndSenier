import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import style from '../profile/Profile.module.css';
import { UserContext } from '../context/User';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // استيراد Modal و Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faPenToSquare, faBuilding, faHotel, faTrashArrowUp, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function ProfileArabic() {
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
      navigate('/ara'); // إعادة التوجيه إلى الصفحة الرئيسية
      window.location.reload();
    }
  }, [isAccountDeleted, userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">جارٍ التحميل...</span>
        </div>
      </div>
    );
  }

  return (
    <aside className={`mb-5 ${style.profile}`} dir='rtl'>
      <div className={`${style.profileLinks}`}>
        <nav>
          <Link to=""><FontAwesomeIcon icon={faFileInvoice} /> المعلومات</Link>
          <Link to="updateInfoAra"><FontAwesomeIcon icon={faPenToSquare} /> تحديث بياناتي</Link>
          <Link to="myEstateAra"><FontAwesomeIcon icon={faBuilding} /> عقاراتي</Link>
          <Link to="updateEstateAra"><FontAwesomeIcon icon={faHotel} /> تحديث العقارات</Link>
          <Link to="interstAra"><FontAwesomeIcon icon={faHeart} /> المفضلة</Link>
          <Link onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faTrashArrowUp} /> حذف الحساب</Link> {/* فتح Modal عند الضغط */}
        </nav>

        <Modal show={showModal} onHide={handleClose}> {/* Modal لتأكيد الحذف */}
          <Modal.Header closeButton>
            <Modal.Title>تأكيد حذف الحساب</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            هل أنت متأكد من رغبتك في حذف حسابك؟
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              إلغاء
            </Button>
            <Button variant="danger" onClick={deleteAccount}>
              حذف الحساب
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      
      <div className={` ${style.d1}`}>
        <Outlet />
      </div>
    </aside>
  );
}
