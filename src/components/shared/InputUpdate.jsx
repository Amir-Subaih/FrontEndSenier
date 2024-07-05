import React from 'react'
import style from '../web/login/Login.module.css'
export default function InputUpdate({ type, title, id, name, value, errors, onChange, touched, onBlur,className }) {
  return (
    <div className='container'>
      <div className="row">
      <div className="col-12 mb-3">
        <label htmlFor={id} className={`${style.lableTitle}`}>{title}</label>

        <input type={type} name={name} value={value} className={className} id={id} onChange={onChange} onBlur={onBlur} />
      
        {touched[name] && errors[name] && <p className='text-danger'>{errors[name]}</p>}
      </div>
      </div>
    
    </div>
  )
}
