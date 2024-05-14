import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/User'
import style from '../profile/Profile.module.css'

export default function UserInfo() {
  let {userData,loading}=useContext(UserContext);
  if(loading)
  {
    return <h1>Loading...</h1>
  }
  return (
    <div className={`${style.info}`}>
    <h5>Name: {userData.name}</h5>
    <h5>Phone: {userData.phone}</h5>
    <h5>Email: {userData.email}</h5>
    </div>
  )
}
