import React from 'react'
import NavbarArabic from '../components/web/navbar/NavbarArabic.jsx'
import FooterArabic from '../components/web/footer/FooterArabic.jsx'
import { Outlet } from 'react-router-dom'

export default function WebLayout() {
  return (
    <>
    <NavbarArabic/>
    <Outlet/>
    <FooterArabic/>
    </>
  )
}