import React, { useEffect, useState } from 'react'
import ListElement from './ListElement'

export default function OrderDetails({cart}) { 
    
    return (
        <div className='orderDetails-parent'>
            <h3>Order Summary</h3>
            <div className="orderDetails-section">
                {cart.map((item) => (
                    <ListElement key={item.id} product={item}/>
                ))}
            </div>
        </div>
    )
}
