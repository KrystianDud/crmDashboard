import React, { useEffect, useState } from 'react';
import './index.css';
import ComposeMessage from './SubComponents/ComposeMessage';

import MessageViewHead from './SubComponents/MessageViewHead';
import MessageViewLine from './SubComponents/MessageViewLine';

import NewMessage from './SubComponents/NewMessage';
import MessageViewSplash from './SubComponents/MessageViewSplash';
import axios from 'axios';

export default function MessageView({ user, view, updateMessageView, messageDetails }) {
    const [line, setLine] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessageChatId, setNewMessageChatId] = useState(null)
    useEffect(() => {
        if (messageDetails.type == 'old') {
            getMessages()
        }
        else if (messageDetails.type == 'new') {

        }
    }, [])

    const getMessages = () => {
        console.log('getting messages...')
        // axios.get('/api/messages', {
        //     props: { chat_id: messageDetails.chatId }
        // })
        //     .then((response) => {
        //         console.log(response.data)
        //         setMessages(response.data.messages)
        //         
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })
    }
    const updateMessages = () => {
        // axios.put('/api/messages', {
        //     props: { chat_id: messageDetails.chatId }
        // })
        //     .then((response) => {
        //         console.log(response.data)
        //         setMessages(response.data.messages)
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })
    }
    const postMessages = () => {
        // axios.post('/api/create_chat', {
        //     data: { messages: messageDetails.chatId }
        // })
        //     .then((response) => {
        //         console.log(response.data)
        //         setMessages(response.data.messages)
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })
    }

    const onChange = (val) => {
        setLine(val)
    }

    const sendMessage = () => {
        // update the array of received data
        // When the chat is new then use post method, otherwise stick to the put as the new line will be added only.

    }

    const createNewMessage = () => {
        const message = {
            line: line
        }
        setMessages([message])

        postMessages()
    }

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
                            lastMessageTime={messageDetails.lastMessageTime}
                            users={messageDetails.users}
                        />
                        <div className="message-view-content">
                            {/* Use Data from backend and map it through this component to display
                            types of messages send from and to the dedicated user. */}
                            {messages.map( (message) => (
                                <MessageViewLine
                                    messages={message.line}
                                    user={user}
                                />
                            ))}
                        </div>
                        <ComposeMessage
                            onChange={onChange}
                            sendMessage={sendMessage}
                        />
                    </div>
                </div>
            )

        default:
            break;
    }
}
