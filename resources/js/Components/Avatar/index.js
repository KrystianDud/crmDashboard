import React, { useState, createRef } from 'react'
import './index.css'
import '../../../css/globals.css'
import axios from 'axios'

import Dropdown from '../Dropdown'

export default function Avatar() {
    const [open, setOpen] = useState(false)
    const [dropPos, setDropPos] = useState({
        x: 0,
        y: 0
    })
    const dropdown = createRef(null);

    const list = [
        {
            id: 1,
            name: 'Profile'
        },
        {
            id: 2,
            name: 'Logout'
        },
    ];

    const openDropdown = (e) => {
        setOpen(true);
        let positionX = e.target.getBoundingClientRect().width - dropdown.current.getBoundingClientRect().width;
        setDropPos({
            x: positionX,
            y: e.target.getBoundingClientRect().height
        })
    }

    const logout = () => {
        axios.post('/api/auth/logout', {
            headers: { 'accept': 'application/json' }
        })
            .then((response) => {
                console.log(response)
            })
    }

    const profile = () => {
        console.log('profile')
    }

    const caller = (id) => {
        switch (id) {
            case 1:
                profile()
                break;
            case 2:
                logout()
                break;
            default:
                break;
        }
    }

    return (
        <div className='relative' onMouseLeave={() => setOpen(false)}>
            <button className='avatar' onClick={(e) => openDropdown(e)} ></button>

            <Dropdown
                type={'simple'}
                position={dropPos}
                open={open}
                list={list}
                ref={dropdown}
                caller={caller}
            />
        </div>
    )
}
