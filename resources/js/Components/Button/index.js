import { useEffect, useState } from "react"
import React from 'react'
import './index.css'
/**
 * @param {text} - button text
 * @param {type} - text , contained , outlined, outlineNormal, outlineSuccess, outlineDanger
 * @param {disabled} - true / false
 * @param {color} - success, danger, normal (note, when the outline is supposed to be outlined, dont use this prop )
 * @param {size} -  sm , lg , xl 
 * @param {icon} - - (optional) - accepts icon  
 * @param {iconSide} - (optional) -  left, right
 * @param {callback} - callback function
 * 
 * ToDo: improve class names readibility
 * ToDo: invert on hover increasing saturation vals
 */

export default function Button({ text, type, disabled, color, size, icon, iconSide, callback }) {
    return (
        <button
            className={
                disabled ? `disabled ${size}`
                    :
                    `${color} ${size} ${iconSide ? iconSide : ''} ${type == 'outlined' ? 'outlined outline' : type} `
            }
            onClick={disabled ? null : callback}
        >
            {icon ? <FontAwesomeIcon size={size} icon={iconOne} /> : null} {text}
        </button>
    )
}


// Sample

{/* <Button
    text={''}
    type={''}
    disabled={false}
    color={''}
    size={''}
    icon={null}
    callback={}
/> */}