import React, { useEffect, useLayoutEffect, useState } from 'react'
import Moment from 'react-moment';
import '../../../../css/globals.css'

export default function MessageViewLine({ user, message }) {

    return (
        <div className={`flexRow ${user.id == message.user_id ? 'flexRowRev' : 'flexRow'}`}>
            <div id={message.user_id}
                className={`messages-inbox-profile m5 `}
                style={{
                    // backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                    background: `url(${message.avatar.slice(6)})`
                }}
            />
            <div className={`messages-inbox-text-box flexColumn alignStart ${user.id == message.user_id ? 'alignEnd' : 'alignStart'}`}>
                <div className={`messages-inbox-message ${user.id == message.user_id ? 'messages-inbox-bcg-right' : 'messages-inbox-bcg-left'}`}>
                    {message.line}
                </div>
                <div className="messages-inbox-message-time">
                    <Moment format="hh:mm A" date={message.created_at} />
                </div>
            </div>
        </div>
    )
}