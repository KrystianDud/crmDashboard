import React from 'react'
import './index.css'
import '../../../css/globals.css'

export default function Input({type, margin, label, onChange, id}) {
    return (
        <form className={type == 'checkbox' ? 'formHandlerHorizontal mt15' : 'formHandler'} style={{margin: `${margin}`}}>
            <label className="inputLabel">{label}</label>
            <input id={id} className="inputClass" type={type} onChange={(e) => onChange(e)}/>
        </form>
    )
}
