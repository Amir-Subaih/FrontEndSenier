import React from 'react';
import style from '../navbar/Navbar.module.css';
import styles from '../footer/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function FooterArabic() {
  return (
    <div className='container' dir='rtl'>
      <div className="row">
        <div className="col-md-2">
          <div className="img d-flex">
            <img src='../../../../img/logoLogin.png' alt='logo' className={`${style.logo}`} />
            <p className={`${styles.logoFooter}`}>AQ Estate</p>
          </div>

          <div className={`${styles.content}`}>
            <p>نص التجربة الوهمية يتم وضعه هنا. يمكن أن يكون طويلاً ومتعدد الأسطر حسب الاحتياجات.</p>
          </div>

          <div className="icons mt-4">
            <FontAwesomeIcon icon={faFacebook} className={`${styles.fac}`} />
            <FontAwesomeIcon icon={faTwitter} className={`${styles.twitter}`} />
            <FontAwesomeIcon icon={faInstagram} className={`${styles.insta}`} />
            <FontAwesomeIcon icon={faLinkedin} className={`${styles.linked}`} />
          </div>

          <div className="All-rights mt-4">
            <p className={`${styles.rights}`}>© 2024 . جميع الحقوق محفوظة.</p>
          </div>
        </div>

        <div className="col-md-4"></div>

        <div className="col-md-3">
          <div className={`${styles.title}`}>
            <p>قم بجولة</p>
          </div>

          <div className={`${styles.takeTour}`}>
            <p>الميزات</p>
            <p>الشركاء</p>
            <p>الأسعار</p>
            <p>المنتج</p>
            <p>الدعم</p>
          </div>
        </div>

        <div className="col-md-2">
          <div className={`${styles.title}`}>
            <p>شركتنا</p>
          </div>

          <div className={`${styles.ourCompany}`}>
            <p>معلومات عنا</p>
            <p>الوكلاء</p>
            <p>المدونة</p>
            <p>وسائل الإعلام</p>
            <p>اتصل بنا</p>
          </div>
        </div>
      </div>
    </div>
  );
}
