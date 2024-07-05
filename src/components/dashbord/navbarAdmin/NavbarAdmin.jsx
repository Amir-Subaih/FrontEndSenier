import React from 'react';
import style from './NavbarAdmin.module.css';

export default function NavbarAdmin() {
    return (

        <nav className={`${style.nav1}`}>
            <img src='../../../../img/logoLogin.png' alt='logo' className={`${style.logo}`} />
            <p className={`${style.logoTitle}`}>AQ Estate</p>
        </nav>

    )
}
