import React from 'react'
import IncrementButtonEnhanced from '../../../Button/IncrementButtonEnhanced'
export default function ListElement({ product }) {
    return (
        <div className='product-body'>
            <div className="product-image"></div>
            <div className='product-details'>
                <p className='product-name'>Product name</p>
                <p className='product-description'>Product description</p>
            </div>
            <p className='product-price'>£23.45</p>
            <div className='product-quantity'>
                <IncrementButtonEnhanced value='100' />
            </div>
            <p className='product-total'>£123.45</p>
        </div>
    )
}
