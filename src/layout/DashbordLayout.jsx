import React from 'react'
import NavbarAdmin from '../components/dashbord/navbarAdmin/NavbarAdmin'
import { Outlet } from 'react-router-dom'
export default function DashbordLayout() {
  return (
    <>
    <NavbarAdmin/>
    <Outlet/>
    </>
  )
}
