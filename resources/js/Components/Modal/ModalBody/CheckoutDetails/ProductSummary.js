import React, { useEffect, useState } from 'react'

export default function ProductSummary({ cart }) {
    const [costs, setCosts] = useState({

    })

    // on start work out the totals for the items in the cart
    useEffect(() => { 
        let currElement, productsTotal = 0, shipping = 0, vat = 0, totalSum = 0, getVat= 0

        cart.forEach(element => {
            currElement = element.quantity * Number(element.price);
            productsTotal += currElement 
        });
        // Add hardcoded shipping value, change in future to model based shipping costs/
        shipping = 50;
        getVat = (productsTotal + shipping) * 0.2
        totalSum = productsTotal + shipping + vat
        vat = Number.parseFloat(getVat).toFixed(2); 
        console.log(vat)
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
                    <p className='summary-text-prices'>£{Number.parseFloat(costs.productsTotal).toFixed(2)}</p>
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
