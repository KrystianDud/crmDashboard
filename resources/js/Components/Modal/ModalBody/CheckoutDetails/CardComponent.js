import React from 'react'
import './index.css'

export default function CardComponent() {
    return (
        <div className='cardComponent-section'>
            <div className="card-element">
                <div className='card-element-container'>
                    <p className='card-element-text'>Company Card</p>
                    <p className='card-element-number'>**** **** **** **** 1004</p>
                </div>
            </div>
            <div className="billingAddress-element">
                <p>First Line Address</p>
                <p>Second Line Address</p>
                <p>City</p>
                <p>PO1 ST1</p>
            </div>
        </div>
    )
}
