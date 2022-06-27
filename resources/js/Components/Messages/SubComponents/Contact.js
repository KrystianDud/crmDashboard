import React from 'react'
import '../index.css'

export default function Contact({ selected, onClick, user }) {
    return (
        <div className={`${selected ? 'messages-contacts-item-selected' : ''} messages-contacts-item flexRow alignCenter w100 mInline5`} onClick={onClick}>
            <div
                className="messages-inbox-profile m5"
                style={{ background: `url(${user.avatar.slice(6)})`, backgroundSize: 'contain' }}
            />
            <div className='flexColumn alignStart'>
                <div className="messages-contacts-item-name">
                    {`${user.name} ${user.surname}`}
                </div>
                <div className="messages-contacts-item-comapny flexRow justifyStart">
                    {/* <p>Company X</p> */}
                    <p>{user.position}</p>
                </div>
            </div>

        </div>
    )
}
