import React from 'react';
import './index.css';
import ComposeMessage from './SubComponents/ComposeMessage';

import MessageViewHead from './SubComponents/MessageViewHead';
import MessageViewLine from './SubComponents/MessageViewLine';

import NewMessage from './SubComponents/NewMessage';

export default function MessageView() {
    return (
        <div className="messages-message-container">
            {/* <div className='messages-view flexColumn mInline15'>
                <MessageViewHead />
                <div className="message-view-content"> */}


            {/* Use Data from backend and map it through this component to display
                    types of messages send from and to the dedicated user. */}


            {/* <MessageViewLine
                    />
                </div>
                <ComposeMessage />
            </div> */}

            <div className="messages-view-new">
                <NewMessage />
            </div>
        </div>
    )
}
