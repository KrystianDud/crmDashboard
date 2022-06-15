import React, { useEffect, useState } from 'react'
import ListElement from './ListElement'
export default function OrderDetails() {
    const [list, setlist] = useState([])

    useEffect(() => {
        simulateList()
    }, [])

    const simulateList = () => {
        let a = []
        for (let i = 0; i < 10; i++) {
            a.push('bollocks')
        } 
        setlist(a)
    }
    return (
        <div className='orderDetails-parent'>
            <h3>Order Summary</h3>
            <div className="orderDetails-section">
                {list && list.map((item) => (
                    <ListElement />
                ))}
            </div>
        </div>
    )
}
