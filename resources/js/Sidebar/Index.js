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


const options = ['Dashboard', 'Orders', 'Products', 'Overview', 'Customer', 'Message', 'Settings']
const icons = [faBox, faCartShopping, faShoppingBasket, faChartBar, faUser, faCommentDots, faCog]

export default function Sidebar({ getDirectory, section }) {
    const [open, setOpen] = useState(true)

    const toggleSidebar = () => {
        setOpen(!open)
    }

    const showMenuItems = options.map((option, index) => (
        <div className={index === section ? `link-decoration optionSelected spacer ${open ? 'centerFlex' : 'simpleFlex'}`
            : `link-decoration optionSelect spacer ${open ? 'centerFlex' : 'simpleFlex'}`}
            key={`s${index}`}
            onClick={() => getDirectory(index)}
        >
            <Link
                style={{color: 'inherit', textDecoration: 'none'}}
                to={option == 'Dashboard' ? `/` : `/${option}`}
            >

                <div className={ open ? 'centerFlex' : 'simpleFlex'}>
                    <div style={{ margin: '5px 10px' }}>
                        <FontAwesomeIcon icon={icons[index]} style={{ color: `${open ? '#fff' : '#000000 !important'}` }} />
                    </div>
                    <p className={open ? 'textDisplay' : 'textCover'} style={{color: 'inherit'}}>{option}</p>
                </div>
            </Link>
        </div>
    ))

    return (
        <div className={open ? "sidebarStyleOpen" : "sidebarStyleClose bcg"}>
            <div className='sidebar-top'>
                <div className={open ? "logo logoFull" : "logo logoTrim"} />

                <div className='hamburger-box' onClick={() => toggleSidebar()}>
                    <FontAwesomeIcon icon={faBars} className='hamburger' />
                </div>
            </div>
            <div className='section-display'>
                {showMenuItems}
            </div>
        </div>
    )
}
