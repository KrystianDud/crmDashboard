import React from 'react'
import '../index.css'

import Moment from 'react-moment';

export default function MessageViewHead({ subject, lastMessageTime, users }) {
    return (
        <div className=' messages-view-head flexColumn alignStart'>
            <p>Last Message: <Moment format="YYYY-MM-DD HH:mm A" date={lastMessageTime} /></p>
            <p>Subject: {subject}</p>

            {/* <h2>Add Easy way to distinguish the involved people in the conversation with possibility of adding private messages. think of stacked avatars to expand on hover</h2> */}
        </div>
    )
}
