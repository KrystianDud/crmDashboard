import React from 'react'
import './index.css';
import '../../css/globals.css';

import Toolbar from '../Components/Messages/Toolbar';
import Inbox from '../Components/Messages/Inbox';
import MessageView from '../Components/Messages/MessageView';

export default function Messages() {
    return (
        <div className="mainView">
            <div className="messages-window flexRow pT15">
                <Toolbar />
                <Inbox />
                <MessageView />
            </div>
        </div>
    )
}
