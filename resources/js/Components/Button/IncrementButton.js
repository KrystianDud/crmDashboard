import React from 'react'
import './index.css';
import '../../../css/globals.css'

export default function IncrementButton() {
    return (
        <div className='incrementContainer flexRow justifyCenter alignCenter'>
            <div className="incrementButton danger"><span>-</span></div>
            <div className="incrementButton normal"><span>+</span></div>
        </div>
    )
}
