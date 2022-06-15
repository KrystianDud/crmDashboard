import React from 'react'
import './index.css'
import Button from '../../../Button/index';
import Input from '../../../Global/Input'
import BillingDetails from './BillingDetails';
import OrderDetails from './OrderDetails';
import ProductSummary from './ProductSummary';
export default function CheckoutDetails() {

    return (
        <div className='checkoutDetails-parent'>
            <div className="section-billing">
                <BillingDetails />
            </div>
            <div className="order-section">
                <OrderDetails />
            </div>
            <div className="summary-section">
                <h3> _ </h3>

                <ProductSummary />
            </div>
        </div>)
}
