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
export default function Input({ type, margin, label, onChange, id, style, styleLabel, styleInput, className }) {
    return (
        <form className={type == 'checkbox ' ? 'formHandlerHorizontal mt15 className' : 'formHandler className'} style={{ margin: `${margin}`, ...style }}>
            <label className="inputLabel" style={styleLabel}>{label}</label>
            <input id={id} className="inputClass" type={type} onChange={(e) => onChange(e)} style={styleInput} />
        </form>
    )
}
