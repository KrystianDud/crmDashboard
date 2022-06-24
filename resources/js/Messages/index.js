import React, { useState } from 'react'
import './index.css';
import '../../css/globals.css';

import Button from '../Components/Button';

import Toolbar from '../Components/Messages/Toolbar';
import Inbox from '../Components/Messages/Inbox';
import MessageView from '../Components/Messages/MessageView';

import { faMessage } from '@fortawesome/free-solid-svg-icons';
export default function Messages({ user }) {
    const [view, setView] = useState(0)
    const [messageDetails, setMessageDetails] = useState({})

    const setScreenView = (num) => {
        setView(num)
    }

    const updateMessageView = (userArray, subject, messageType = 'new') => {
        const details = {
            id: 0,
            type: messageType,
            subject: subject,
            users: userArray,
            lastMessageTime: '',
            chatId: null
        }
        setMessageDetails(details)
        setScreenView(2)
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
                        messageDetails={messageDetails}
                        updateMessageView={updateMessageView}
                    />
                </div>

                <MessageView
                    user={user}
                    view={view}
                    updateMessageView={updateMessageView}
                    messageDetails={messageDetails}
                />
            </div>
        </div>
    )
}
