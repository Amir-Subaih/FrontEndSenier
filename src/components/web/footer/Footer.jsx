import React from 'react'
import style from '../navbar/Navbar.module.css'
import styles from '../footer/Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons'
export default function Footer() {
  return (
    <div className='container'>
      <div className="row ">
        <div className="col-md-2">
          <div className="img d-flex">
          <img src='../../../../img/logoLogin.png' alt='logo' className={`${style.logo}`}/>
          <p className={`${styles.logoFooter}`}>AQ Estate</p>
          </div>

          <div className={`${styles.content}`}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>

          <div className="icons mt-4">
          <FontAwesomeIcon icon={faFacebook} className={`${styles.fac}`}/>
          <FontAwesomeIcon icon={faTwitter} className={`${styles.twitter}`}/>
          <FontAwesomeIcon icon={faInstagram} className={`${styles.insta}`}/>
          <FontAwesomeIcon icon={faLinkedin} className={`${styles.linked}`}/>
          {/* <FontAwesomeIcon icon={faUsers} className={`${styles.linked}`}/> */}
          </div>

          <div className="All-rights mt-4">
            <p className={`${styles.rights}`}>© 2024 . All rights reserved.</p>
          </div>
        </div>
          <div className="col-md-4"></div>
          
        <div className="col-md-3">
          <div className={`${styles.title}`}>
          <p>Take a tour</p>
          </div>

          <div className={`${styles.takeTour}`}>
            <p>Features</p>
            <p>Partners</p>
            <p>Pricing</p>
            <p>Product</p>
            <p>Support</p>
          </div>
        </div>

        <div className="col-md-2">
          <div className={`${styles.title}`}>
          <p>Our Company</p>
          </div>

          <div className={`${styles.ourCompany}`}>
          <p>About Us</p>
          <p>Agents</p>
          <p>Blog</p>
          <p>Media</p>
          <p>Contact Us</p>
          </div>
        </div>

      </div>
    </div>
  )
}
