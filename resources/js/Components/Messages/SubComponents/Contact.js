import React from 'react'
import '../index.css'

export default function Contact({selected, onClick}) {
    return (
        <div className={`${selected ? 'messages-contacts-item-selected' : ''} messages-contacts-item flexRow alignCenter w100 mInline5`} onClick={onClick}>
            <div
                className="messages-inbox-profile m5"
                style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}
            />
            <div className='flexColumn alignStart'>
                <div className="messages-contacts-item-name">
                    Krystian Dudzinski
                </div>
                <div className="messages-contacts-item-comapny flexRow justifyStart">
                    <p>Company X</p>
                    <p>Account Manager</p>
                </div>
            </div>

        </div>
    )
}
