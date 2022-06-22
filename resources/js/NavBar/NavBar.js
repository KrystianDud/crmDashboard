import React, { useState, useEffect } from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../Components/Avatar';
import Cart from '../Components/Cart';
import { UserDataContext } from '../app';
export default function Navbar({ section, logoutUser, shoppingCart, updateCart, user, activateModal, company }) {


    return (
        <div className="navBar">
            <div>
                <h2 className='section'>{section != null ? sections[section] : ''}</h2>
            </div>
            <div className='flexRow'>
                <form className="search-ele" action="">
                    <button className='search-icon'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input type="text" className='search-text' placeholder="Search.." />
                </form>
                {user.type == 'client' ?
                    <Cart
                        updateCart={updateCart}
                        shoppingCart={shoppingCart}
                        activateModal={activateModal}
                        company={company}
                        user={user}
                    /> : null}
                <Avatar logoutUser={logoutUser} />
            </div>
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