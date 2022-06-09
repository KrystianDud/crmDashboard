import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../index.css'

export default function TwinButtonRectangle({ defaultView, onClick, iconOne, iconTwo }) {
    // set default value using props to change it later on
    const [active, setActive] = useState(defaultView)

    const activateButton = (ref) => {
        setActive(ref)
        onClick(ref)
    }

    return (
        <div className='rectangleBtnWide' >
            <button  onClick={() => activateButton(0)} className={defaultView == 0 ? 'BtnSibling BtnSiblingActive cornerLeft' : 'BtnSibling cornerLeft'}>
                <FontAwesomeIcon size='xl' icon={iconOne} />
            </button>

            <button onClick={() => activateButton(1)} className={defaultView == 1 ? 'BtnSibling BtnSiblingActive cornerRight' : 'BtnSibling cornerRight'}>
                <FontAwesomeIcon size='xl' icon={iconTwo}  />
            </button>
        </div>
    )
}
