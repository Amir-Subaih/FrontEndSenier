import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../components/web/context/User';
import Navbar from '../components/web/admin/AdminNavbar'
import { Outlet } from 'react-router-dom';

export default function WebLayout() {
  const { isAdmin } = useContext(UserContext);

  useEffect(() => {
    if (isAdmin) {
      try {
        console.log('user is admin :',isAdmin);

      } catch (error) {
        console.error('Error decoding the token:', error);
      }
    }
  }, [isAdmin]);

  if (!isAdmin ) {
    console.log(isAdmin);
    return <div className='m-5 p-5'>You do not have access to this page.</div>;
  }
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}
