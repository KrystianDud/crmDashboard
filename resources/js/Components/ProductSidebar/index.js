import React, { useState, useEffect } from 'react'
import './index.css'
import '../../../css/globals.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

import BorderLine from '../BorderLine'

export default function ProductSidebar({ showSidebar, closeItem, currentItem, newItem, createProduct, saveProduct }) {
    const [display, setDisplay] = useState(true)

    useEffect(() => {
    }, [])

    const changeSliderVal = (e) => {
        console.log(e.target.value)
    }

    return (
        <div className={`sidebarBody ${showSidebar ? 'sideScreenShow' : 'sideScreenHide'}`}>

            <div className='topSection' >
                <div className={`closeSidebar ${showSidebar ? '' : 'hideClose'}`} onClick={() => closeItem()}>
                    <FontAwesomeIcon icon={faClose} />
                </div>
            </div>

            <BorderLine />

            <div className="productName w100 minH10vh">
                {newItem ?
                    <div className='flexColumn flexLeft w100 m5 paragraphThin'>
                        <p>Product name</p>
                        <input id='name' placeholder='product name' type='text' className='subtleInput' onChange={(e) => createProduct(e.target.value, e.target.id)} />
                    </div>
                    :
                    <h4 className="showTitle">{currentItem.name}</h4>}
            </div>

            <BorderLine />

            <div className="productDescription w100 minH10vh paragraphThin">
                {newItem ?
                    <div className='flexColumn flexLeft m5'>
                        <p>Product Description</p>
                        <textarea id='description' placeholder='product description ' type='text' maxLength='250' rows='12' cols="25" className='subtleInput minH10vh ' onChange={(e) => createProduct(e.target.value, e.target.id)} />
                    </div>
                    :
                    <p className="showTitle">{currentItem.description}</p>}
            </div>

            <BorderLine />

            <div className="productPrice w100 minH10vh m5">
                {newItem ?
                    <div className="showPrice paragraphThin flexColumn flexLeft ">
                        <p>Product price</p>
                        <input id='price' placeholder='product price' type='number' className='subtleInput' onChange={(e) => createProduct(e.target.value, e.target.id)} />
                    </div>
                    :
                    <div className="showPrice">
                        <p>{`Value: $${currentItem.price}`}</p>
                        <div className="slidecontainer">
                            <input type="range" min="1" max="1000" value={currentItem.price} className="slider" id="myRange" onChange={changeSliderVal} />
                        </div>
                    </div>}
            </div>

            <BorderLine />

            <div className="w100 minH10vh" style={{ margin: '15px' }}>
                <button className='bMain' onClick={() => saveProduct()}>Update</button>
            </div>


            <div className="financeSection">
                <div className='subtitleDetails'>
                    Pre-Dispach: 239
                </div>
            </div>
        </div>
    )
} 