import React from 'react'
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ButtonRectangle({icon, onClick}) {
    return (
        <button className='rectangleBtn' onClick={() => onClick()}>
            <FontAwesomeIcon size='xl' icon={icon} /> 
        </button>
    )
}
