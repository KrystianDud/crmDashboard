import React from 'react'
import '../index.css'

export default function InboxHead() {


    return (
        <div className='messages-inbox-head flexRow alignCenter flexBetween'>
            <div
                className="messages-inbox-profile m5"
                style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}
            />
            <div className="messages-inbox-snippets flexColumn alignStart ">
                <div className="messages-inbox-nameTime flexRow flexBetween">
                    <p>Name Surname</p>
                    <p>4:30pm</p>
                </div>
                <p>Subject:</p>
                <p>Message body...</p>
            </div>
        </div>
    )
}
