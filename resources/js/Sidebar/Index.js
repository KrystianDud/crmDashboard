import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faShoppingBasket, faChartBar, faUser, faCommentDots, faCog, faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons'
// import { faOpencart } from '@fortawesome/free-brands-svg-icons'

import {
    Route,
    Routes,
    Link,
    Navigate,
    generatePath,
    useLocation
} from "react-router-dom";

import './index.css';
import '../../css/globals.css'


const options = ['Dashboard', 'Orders', 'Products', 'Overview', 'Customer', 'Message', 'Settings']
const icons = [faBox, faCartShopping, faShoppingBasket, faChartBar, faUser, faCommentDots, faCog]

export default function Sidebar({ getDirectory, section }) {
    const [open, setOpen] = useState(true)

    const toggleSidebar = () => {
        setOpen(!open)
    }

    const showMenuItems = options.map((option, index) => (
        <div className={`flexRow justifyCenter hover-normal-secondary pB5 pT5 color-black font-body1
            ${index === section ? 'borderNormal optionSelected  background-normal-secondary' : ''} 
            ${open ? 'flexCenter justifyCenter' : 'flexCenter justifyStart'}
            ${index === section & !open ? 'borderWhite' : 'borderNormal'}
            `}

            key={`s${index}`}
            onClick={() => getDirectory(index)}
        >
            <Link
                style={{ color: 'inherit', textDecoration: 'none' }}
                to={option == 'Dashboard' ? `/` : `/${option}`}
                className={open ? 'flexRow flexCenter justifyCenter' : 'flex flexCenter justifyStart'}
            >
                <div style={{ margin: '5px 10px' }}>
                    <FontAwesomeIcon icon={icons[index]} style={{ color: `${open ? '#fff' : '#000000 !important'}` }} />
                </div>
                <p className={open ? 'textDisplay' : 'textCover '} style={{ color: 'inherit' }}>{option}</p>
            </Link>
        </div>
    ))

    return (
        <div className={open ? "sidebarStyleOpen background-white color-black" : "sidebarStyleClose background-normal color-white"}>

            <div className='w100 flexRow justifyEnd' onClick={() => toggleSidebar()}>
                <FontAwesomeIcon icon={faBars} className='hamburger' />
            </div>

            <div className={open ? "logo logoFull" : "logo logoTrim"} />

            <div className='flexColumn sidebar-list h100'>
                {showMenuItems}
            </div>
        </div>
    )
}
