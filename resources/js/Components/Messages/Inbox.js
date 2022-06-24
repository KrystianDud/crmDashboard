import React from 'react'
import '../../../css/globals.css'

import Button from '../Button/index'

import InboxHead from './SubComponents/InboxHead'

export default function Inbox({messageDetails}) {
    return (
        <div className="messages-inbox-container">
            <InboxHead />
        </div>
    )
}
