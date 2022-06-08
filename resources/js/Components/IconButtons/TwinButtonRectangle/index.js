import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function TwinButtonRectangle({ onClick, iconOne, iconTwo }) {
    // set default value using props to change it later on
    const [active, setActive] = useState(0)

    const activateButton = (ref) => {
        setActive(ref)
        onClick(ref)
    }

    return (
        <div className='rectangleBtnWide' >
            <button  onClick={() => activateButton(0)} className={active == 0 ? 'BtnSibling BtnSiblingActive cornerLeft' : 'BtnSibling cornerLeft'}>
                <FontAwesomeIcon icon={iconOne} />
            </button>

            <button onClick={() => activateButton(1)} className={active == 1 ? 'BtnSibling BtnSiblingActive cornerRight' : 'BtnSibling cornerRight'}>
                <FontAwesomeIcon icon={iconTwo}  />
            </button>
        </div>
    )
}
