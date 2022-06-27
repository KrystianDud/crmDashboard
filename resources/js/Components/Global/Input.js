import React from 'react'
import './index.css'
import '../../../css/globals.css'

/**
 * 
 * @param {type} param0 
 * @param {margin} param0 
 * @param {label} param0 
 * @param {onChange} param0 
 * @param {id} param0 
 * @param {style} Object, Children tags: <label/>, <input/>  
 */
export default function Input({ type, checked, margin, label, onChange, id, style, styleLabel, styleInput, className, placeholder, value }) {
    return (
        <form className={`${className} ${type == 'checkbox ' ? 'formHandlerHorizontal mt15 ' : 'formHandler '}`} style={{ margin: `${margin}`, ...style }}>
            <label className="inputLabel" style={styleLabel}>{label}</label>
            <input id={id} className="inputClass" value={value} checked={checked} type={type} placeholder={placeholder} onChange={(e) => onChange(e)} style={styleInput} />
        </form>
    )
}
