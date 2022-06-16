import React, { useEffect } from 'react'
import './index.css'
import Button from '../../../Button/index';
import Input from '../../../Global/Input'
import BillingDetails from './BillingDetails';
import OrderDetails from './OrderDetails';
import ProductSummary from './ProductSummary';

export default function CheckoutDetails({shoppingCart, company}) {
useEffect(() => {
    console.log('on modal checkout' , company)
}, [])

    return (
        <div className='checkoutDetails-parent'>
            <div className="section-billing">
                <BillingDetails company={company}/>
            </div>
            <div className="order-section">
                <OrderDetails cart={shoppingCart}/>
            </div>
            <div className="summary-section">
                <h3> _ </h3>
                <ProductSummary cart={shoppingCart}/>
            </div>
        </div>)
}
