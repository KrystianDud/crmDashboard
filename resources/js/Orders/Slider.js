import React, { useLayoutEffect, useState } from 'react'
import '../Components/Table/index.css'

import Button from '../Components/Button'
export default function Slider({ id, activeId, sliderData, array }) {
    const [active, setActive] = useState(false)

    console.log(sliderData.invoices[id][0])
    const invoice = sliderData.invoices[id][0]
    useLayoutEffect(() => {
        // if active index returns array of this item then this is the last item which can get the animation-out css class otherwise ignore
        let activeIndex = array[array.length - 2];
        if (activeIndex != 'undefined' && activeIndex == id) {
            setActive(true)
        } else {
            setActive(false)
        }


    }, [array])
    return (
        <div className={` ${activeId === id ? 'table-slider table-slider-animate-in' : 'table-slider-off'}  ${active ? 'table-slider-animate-out' : ''} `}>
            <div className="table-slider-invoiceDetails table-control-stretch mInline15 pInline15">
                <div className="table-cell table-cell-column-left">
                    <p>Shipping Address</p>
                    <p>{invoice.shipping_first_line}</p>
                    <p>{invoice.shipping_second_line}</p>
                    <p>{invoice.shipping_city_line}</p>
                    <p>{invoice.shipping_postcode}</p>
                </div>
                <div className="table-cell table-cell-column-left">
                    <p>Billing Address</p>
                    <p>{invoice.billing_first_line}</p>
                    <p>{invoice.billing_second_line}</p>
                    <p>{invoice.billing_city_line}</p>
                    <p>{invoice.billing_postcode}</p>
                </div>
                <div className="table-cell table-cell-column-left">
                    <p>{`Payment: (card) ${invoice.card_number.slice(-4)}`}</p>
                </div>
                <div className="table-cell table-cell-column-left">
                    <p>Invoice</p>
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
                {sliderData.products[id].map((item) => (
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
