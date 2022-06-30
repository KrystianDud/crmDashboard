import React from 'react'
import '../../../css/globals.css'
import './index.css'
import '../../Components/Table/index.css'

import Button from '../../Components/Button'

// { data, id, index, activeId, array }
export default function TableDetails({data, id, index}) {
    const invoice = data.invoices[id]

    return (
        <div>
            <div className="table-slider-invoiceDetails table-control-stretch mInline15 pInline15">
                <div className="table-cell table-cell-column-left">
                    <p className='font-subtitle1 '>Shipping Address</p>
                    <p className='font-subtitle1 '>{invoice.shipping_first_line}</p>
                    <p className='font-subtitle1 '>{invoice.shipping_second_line}</p>
                    <p className='font-subtitle1 '>{invoice.shipping_city_line}</p>
                    <p className='font-subtitle1 '>{invoice.shipping_postcode}</p>
                </div>
                <div className="table-cell table-cell-column-left">
                    <p className='font-subtitle1 '>Billing Address</p>
                    <p className='font-subtitle1 '>{invoice.billing_first_line}</p>
                    <p className='font-subtitle1 '>{invoice.billing_second_line}</p>
                    <p className='font-subtitle1 '>{invoice.billing_city_line}</p>
                    <p className='font-subtitle1 '>{invoice.billing_postcode}</p>
                </div>
                <div className="table-cell table-cell-column-left">
                    <p className='font-subtitle1 '>{`Payment: (card) ${invoice.card_number.slice(-4)}`}</p>
                </div>
                <div className="table-cell table-cell-column-left">
                    <p className='font-subtitle1 '>Invoice</p>
                </div>
                <div className="table-cell table-cell-column-left">
                    <Button
                        text={'Cancel Order'}
                        type={'contained'}
                        disabled={false}
                        color={'danger'}
                        size={'sm'}
                        icon={null}
                        callback={() => console.log('now the order should be canceled')}
                    />
                </div>
            </div>
            <div className="table-slider-detailsContainer mInline20">
                {data.products[id].map((item) => (
                    <div className="table-control" key={item.id}>
                        <div className="table-cell-image-container">
                            <div className='table-cell-image' style={{ backgroundImage: `url(${item.slug.slice(6)})` }} />
                        </div>
                        <div className="table-cell table-cell-column-left">
                            <p>{item.name}</p>
                            <p>{item.description}</p>
                        </div>
                        <div className="table-cell table-cell-column-left">
                            <p>Price: <span>{item.price}</span></p>
                        </div>
                        {/* <div className="table-cell table-cell-column-left">
                            <p>Quantity</p>
                        </div> */}
                    </div>
                ))}
            </div>

        </div>
    )
}
