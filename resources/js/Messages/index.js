import React, { useState } from 'react'
import './index.css';
import '../../css/globals.css';

import Button from '../Components/Button';

import Toolbar from '../Components/Messages/Toolbar';
import Inbox from '../Components/Messages/Inbox';
import MessageView from '../Components/Messages/MessageView';

import { faMessage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
export default function Messages({ user }) {
    // controls whet is displayed in the message view.
    const [view, setView] = useState(0)
    // Id of the open chat, either selected from the inbox or create from new message window.
    const [openChat, setOpenChat] = useState(null)

    const setScreenView = (num) => {
        setView(num)
    }

    const updateMessageView = (chatId = null) => {
        setScreenView(2)
        setOpenChat(chatId)
    } 

    return (
        <div className="mainView">
            <div className="messages-window flexRow pT15">
                <Toolbar />

                <div className='messages-inbox flexColumn alignCenter'>
                    <div className='flexRow justifyEnd w100'>
                        <Button
                            text={'New Message'}
                            type={'contained'}
                            disabled={false}
                            color={'normal'}
                            size={'lg'}
                            icon={faMessage}
                            callback={() => setScreenView(1)}
                        />
                    </div>
                    <Inbox
                        user={user}
                        updateMessageView={updateMessageView}
                    />
                </div>

                <MessageView
                    user={user}
                    openChat={openChat}

                    view={view}
                    updateMessageView={updateMessageView}
                />
            </div>
        </div>
    )
}
