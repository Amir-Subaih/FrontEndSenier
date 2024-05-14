import React from 'react'
import style from '../web/login/Login.module.css'
export default function Input({ type, title, id, name, value, errors, onChange, touched, onBlur,onFocus }) {
  return (
    <>
      <div className=" mb-3">
        <label htmlFor={id} className={`${style.lableTitle}`}>{title}</label>

        <div>
          <input type={type} name={name} value={value} id={id} onChange={onChange} onFocus={onFocus} onBlur={onBlur} className="form-control w-50 border border-secondary"/>
          
        </div>
        {/* "form-control w-50 border border-secondary"  */}

        {touched[name] && errors[name] && <p className='text-danger'>{errors[name]}</p>}
      </div>
    
    </>
  )
}
