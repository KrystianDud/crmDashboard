import React, { useState, useRef } from 'react'
import './index.css'
import '../../../css/globals.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import Dropdown from '../Dropdown'

export default function Cart(shoppingCart) {
    const [open, setOpen] = useState(false)
    const [dropPos, setDropPos] = useState({
        x: 50,
        y: 110
    })
    const dropdown = useRef(null);

    const openDropdown = (e) => {
        e.stopPropagation();
        setOpen(true);
        let positionX = e.target.getBoundingClientRect().width - dropdown.current.getBoundingClientRect().width;
        setDropPos({
            x: positionX,
            y: e.target.getBoundingClientRect().height
        })
    }

    return (
        <div className='relative' onMouseLeave={() => setOpen(false)}>
            <button className='cart' onClick={(e) => openDropdown(e)}>
                <FontAwesomeIcon size='xl' icon={faCartShopping} />
            </button>
            <Dropdown
                type={'cart'}
                position={dropPos}
                open={open}
                list={shoppingCart}
                ref={dropdown}
                caller={null}
            />
        </div>
    )
}
