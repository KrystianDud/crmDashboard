import React, { useEffect, useState } from 'react';
import './index.css';
import ComposeMessage from './SubComponents/ComposeMessage';

import MessageViewHead from './SubComponents/MessageViewHead';
import MessageViewLine from './SubComponents/MessageViewLine';

import NewMessage from './SubComponents/NewMessage';
import MessageViewSplash from './SubComponents/MessageViewSplash';


export default function MessageView({ user, view, updateMessageView, sendMessage, messageDetails, users, messages }) {

    switch (view) {
        case 0:
            return (
                <div className="messages-message-container">
                    <MessageViewSplash />
                </div>
            )
        case 1:
            return (
                <div className="messages-message-container">
                    <NewMessage
                        user={user}
                        updateMessageView={updateMessageView}
                    />
                </div>
            )
        case 2:
            return (
                <div className="messages-message-container">
                    <div className='messages-view flexColumn mInline15 justifyBetween'>
                        <MessageViewHead
                            subject={messageDetails.subject}
                            lastMessageTime={messageDetails.created_at}
                            users={messageDetails.users}
                        />
                        <div className="message-view-content">
                            {/* Use Data from backend and map it through this component to display
                            types of messages send from and to the dedicated user. */}
                            {typeof messageDetails.lines != 'undefined' ? messageDetails.lines.map((message) => (
                                <MessageViewLine
                                    key={message.id}
                                    message={message}
                                    user={user}
                                />
                            )) : null}

                        </div>
                        <ComposeMessage
                            sendMessage={sendMessage}
                        />
                    </div>
                </div>
            )

        default:
            break;
    }
}
