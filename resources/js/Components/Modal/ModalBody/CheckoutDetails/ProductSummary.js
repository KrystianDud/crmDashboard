import React, { useEffect, useState } from 'react'

export default function ProductSummary({ cart }) {
    const [costs, setCosts] = useState({

    })

    // on start work out the totals for the items in the cart
    useEffect(() => {
        console.log(cart)
        let currElement, productsTotal = 0, shipping, vat, totalSum

        cart.forEach(element => {
            currElement = element.quantity * Number(element.price);
            productsTotal += currElement
            console.log('currElement', currElement)
        });
        // Add hardcoded shipping value, change in future to model based shipping costs/
        shipping = 50;
        vat = (productsTotal + shipping) * 0.2
        totalSum = productsTotal + shipping + vat

        console.log(productsTotal)
        setCosts({
            productsTotal: productsTotal,
            shipping: shipping,
            vat: vat,
            totalSum: totalSum,
        })
    }, [])

    return (
        <div className="summary-body">

            <div className="summary-costs">
                <div className="summary-total">
                    <p className='summary-text-titles'>Products Total:</p>
                    <p className='summary-text-prices'>£{costs.productsTotal}</p>
                </div>
                <div className="summary-total">
                    <p className='summary-text-titles'>Shipping:</p>
                    <p className='summary-text-prices'>£{costs.shipping}</p>
                </div>
                <div className="summary-total">
                    <p className='summary-text-titles'>VAT:</p>
                    <p className='summary-text-prices'>£{costs.vat}</p>
                </div>
            </div>

            <div className="summary-total">
                <p className='summary-text-total'>Total</p>
                <p className='summary-text-prices'>£{costs.totalSum}</p>
            </div>

        </div>)
}
