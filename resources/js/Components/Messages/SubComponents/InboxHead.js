import React, { useState } from 'react'
import '../index.css'
import Moment from 'react-moment';




export default function InboxHead({ message, onClick, selected }) {

    return (
        <div
            className={`${selected == message.id ? 'messages-inbox-head-selected' : ''} messages-inbox-head flexRow alignCenter flexBetween mb5`}
            onClick={onClick}
        >
            <div
                className="messages-inbox-profile m5"
                style={{ background: `url(${message.lines[0].avatar.slice(6)})`, backgroundSize: 'contain' }}
            />
            <div className="messages-inbox-snippets flexColumn alignStart ">
                <div className="messages-inbox-nameTime flexRow flexBetween ">
                    <p className='m0 fw4'>{message.lines[0].name} {message.lines[0].surname}</p>
                    <Moment format="ddd, hh:mm A" date={message.created_at} className="fw3" />
                </div>
                <p className='m0 fw6'>Subject: {message.subject}</p>
            </div>
        </div>
    )
}
