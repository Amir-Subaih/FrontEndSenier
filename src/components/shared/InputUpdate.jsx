import React from 'react'
import style from '../web/login/Login.module.css'
export default function InputUpdate({ type, title, id, name, value, errors, onChange, touched, onBlur,className }) {
  return (
    <>
      <div className=" mb-3">
        <label htmlFor={id} className={`${style.lableTitle}`}>{title}</label>

        <div>
          <input type={type} name={name} value={value} className={`form-control ${style.input}`} id={id} onChange={onChange} onBlur={onBlur} />
          
        </div>
        {/* "form-control w-50 border border-secondary"  */}

        {touched[name] && errors[name] && <p className='text-danger'>{errors[name]}</p>}
      </div>
    
    </>
  )
}
