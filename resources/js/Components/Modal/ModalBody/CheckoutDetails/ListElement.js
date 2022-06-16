import React from 'react'
import IncrementButtonEnhanced from '../../../Button/IncrementButtonEnhanced'
export default function ListElement({ product }) {
    const style = {
        backgroundImage: `url(${product.slug.slice(6)})`,
    }

    const total = product.quantity * product.price;
    return (
        <div className='product-body' >
            <div className="product-image" style={style}></div>
            <div className='product-details'>
                <p className='product-name'>{product.name}</p>
                <p className='product-description'>{product.description}</p>
            </div>
            <p className='product-price'>£{product.price}</p>
            <div className='product-quantity'>
                <IncrementButtonEnhanced value={product.quantity} />
            </div>
            <p className='product-total'>{total}</p>
        </div>
    )
}
