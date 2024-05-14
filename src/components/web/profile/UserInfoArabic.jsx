import React, { useContext } from 'react'
import { UserContext } from '../context/User'
import style from '../profile/Profile.module.css'

export default function UserInfo() {
  let {userData, loading} = useContext(UserContext);
  if (loading) {
    return <h1>جارٍ التحميل...</h1>
  }
  return (
    <div className={`${style.info}`} dir='rtl'>
    <h5>الاسم: {userData.name}</h5>
    <h5>الهاتف: {userData.phone}</h5>
    <h5>البريد الإلكتروني: {userData.email}</h5>
    </div>
  )
}
