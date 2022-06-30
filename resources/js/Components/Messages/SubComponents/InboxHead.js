import React, { useState } from 'react';

import '../index.css';
import '../../../../css/globals.css'
import Moment from 'react-moment';




export default function InboxHead({ message, onClick, selected }) {

    return (
        <div
            className={`${selected ? 'background-normal-secondary' : 'background-white hover-grey-primary'} messages-inbox-head flexRow alignCenter justifyStarts mb5`}
            onClick={onClick}
        >
            <div
                className="messages-inbox-profile mt5 mb5 mInline15"
                style={{ background: `url(${message.lines[0].avatar.slice(6)})`, backgroundSize: 'contain' }}
            />
            <div className="messages-inbox-snippets flexColumn alignStart justifyStart fs-07r ">
                <div className="messages-inbox-nameTime flexRow flexBetween fs-08r w100">
                    <p className='m0 fw4'>{message.lines[0].name} {message.lines[0].surname}</p>
                    <Moment format="ddd, hh:mm A" date={message.created_at} className="fw3" />
                </div>
                <p className='m0 fw3 fs-07r'>{message.subject}</p>
            </div>
        </div>
    )
}
