import React, { useState, useEffect } from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Navbar({ section }) {
    

    return (
        <div className="navBar">
            <div>
                <h2 className='section'>{section != null ? sections[section] : ''}</h2>
            </div>

            <form className="search-ele" action="">
                <button className='search-icon'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input type="text" className='search-text' placeholder="Search.." />
            </form>

        </div>
    )
}


const sections = {
    0: 'Dashboard',
    1: 'Orders',
    2: 'Products',
    3: 'Overview',
    4: 'Customer',
    5: 'Message',
    6: 'Settings'
}