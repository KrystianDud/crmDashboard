import React, { useState, createRef } from 'react'
import './index.css'
import '../../../css/globals.css'
import axios from 'axios'

import Dropdown from '../Dropdown'

export default function Avatar({logoutUser}) {
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
        // console.log(document.cookie)

        // const cookieValue = document.cookie
        //     .split('; ')
        //     .find(row => row.startsWith('Bearer'))
        //     .split('=')[1];
        axios.defaults.withCredentials = true;
        // axios.post('/api/auth/logout', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${cookieValue}`
        //     }

        // })# 

        let token = JSON.parse(localStorage.getItem('token'));

        axios('/api/auth/logout', {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                if(response.status ===  200) {
                    // remove the cookie, and use router to move the user to the login screen
                    logoutUser()
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const profile = () => {
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
