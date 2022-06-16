import React from 'react'
import './index.css'

export default function CardComponent({company}) {
    return (
        <div className='cardComponent-section'>
            <div className="card-element">
                <div className='card-element-container'>
                    <p className='card-element-text'>Company Card</p>
                    <p className='card-element-number'>**** **** **** **** 1004</p>
                </div>
            </div>
            <div className="billingAddress-element">
                <p>{company.line_1}</p>
                <p>{company.line_2}</p>
                <p>{company.city}</p>
                <p>{company.postcode}</p>
            </div>
        </div>
    )
}
