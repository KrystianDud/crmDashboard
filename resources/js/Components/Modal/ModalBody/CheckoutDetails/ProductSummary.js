import React from 'react'

export default function ProductSummary() {
    return (
        <div className="summary-body">

            <div className="summary-costs">
                <div className="summary-total">
                    <p className='summary-text-titles'>Products Total:</p>
                    <p className='summary-text-prices'>£</p>
                </div>
                <div className="summary-total">
                    <p className='summary-text-titles'>Shipping:</p>
                    <p className='summary-text-prices'>£</p>
                </div>
                <div className="summary-total">
                    <p className='summary-text-titles'>VAT:</p>
                    <p className='summary-text-prices'>£</p>
                </div>
            </div>

            <div className="summary-total">
                <p className='summary-text-total'>Total</p>
                <p className='summary-text-prices'>£</p>
            </div>

        </div>)
}
