import { createRoot } from 'react-dom/client';
import React, { createContext, useState, useEffect, useMemo } from 'react'
import CheckoutDetails from './Components/Modal/ModalBody/CheckoutDetails';
export default function TestEnv() {

    const style = {
        width: '80vw',
        height: '80vh',
        background: 'grey',
        margin: 'auto',
        border: '1px dashed grey',
        borderRadius: '15px'
    }
    const style2 = {
        width: '80vw',
        height: '70vh',
        background: 'white',
        margin: '5vh auto'
    }

    return (
        <div>
            <h1>Testing here</h1>
            <div className="testingView" style={style}>
                <div className="contentView" style={style2}>
                    <CheckoutDetails 
                    />
                </div>
            </div>
        </div>
    )
}

const root = createRoot(document.getElementById('main'));
root.render(<TestEnv />); 