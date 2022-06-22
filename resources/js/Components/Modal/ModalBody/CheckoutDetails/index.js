import React from 'react'
import './index.css'
import BillingDetails from './BillingDetails';
import OrderDetails from './OrderDetails';
import ProductSummary from './ProductSummary';

/**
 * @param {*} param0 
 * 
 * Data required for the backend to accept the request
 * orders
 * user_id
 * company_id
 * billing_first_line
 * billing_second_line
 * billing_city_line
 * billing_postcode
 * card_number
 * shipping_first_line
 * shipping_second_line
 * shipping_city
 * shipping_postcode
 */

export default function CheckoutDetails({ shoppingCart, company, user, computedData, setComputedData }) {
    // this is temporary part of the code that will pretend using banking details for the backend to verify
    const getPaymentDetails = (card_number) => {
        // at this stage control of the number of items already in modal is not active. Must be considered for further development
        setComputedData({
            ...computedData,
            card_number: card_number,
            billing_first_line: company.line_1,
            billing_second_line: company.line_2,
            billing_city_line: company.city,
            billing_postcode: company.postcode,
            company_id: user.company_id,
            user_id: user.id,
            orders: shoppingCart
        })
    }

    const onChange = (e) => {
        let object;
        if (e.target.type === 'file') {
            object = {
                ...computedData,
                [e.target.id]: e.target.files[0]
            }
        }
        else {
            object = {
                ...computedData,
                [e.target.id]: e.target.value
            }
        }
        setComputedData(object)
    }

    return (
        <div className='checkoutDetails-parent'>
            <div className="section-billing">
                <BillingDetails
                    company={company}
                    onChange={onChange}
                    getPaymentDetails={getPaymentDetails}
                />
            </div>
            <div className="order-section">
                <OrderDetails cart={shoppingCart} />
            </div>
            <div className="summary-section">
                <h3> _ </h3>
                <ProductSummary cart={shoppingCart} />
            </div>
        </div>)
}
