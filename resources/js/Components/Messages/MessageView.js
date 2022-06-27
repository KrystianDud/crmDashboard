import React, { useEffect, useState } from 'react';
import './index.css';
import ComposeMessage from './SubComponents/ComposeMessage';

import MessageViewHead from './SubComponents/MessageViewHead';
import MessageViewLine from './SubComponents/MessageViewLine';

import NewMessage from './SubComponents/NewMessage';
import MessageViewSplash from './SubComponents/MessageViewSplash';
import axios from 'axios';

export default function MessageView({ user, openChat, view, updateMessageView }) {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [messageDetails, setMessageDetails] = useState({})

    useEffect(() => {
        if (openChat) {
            getChat(openChat)
        }
    }, [openChat])

    const getChat = () => {
        axios.get(`api/chat/${openChat}`)
            .then((response) => {
                // user_id, user_avatar, line, created_at
                setUsers(response.data.data.users)
                setMessageDetails(response.data.data.chat)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const sendMessage = (line) => {
        if (!openChat) {
            createMessage(line)
        }
        else {
            updateLines(line)
        }
    }

    const createMessage = (line) => {
        if (!openChat) {
            // update the array of received data
            // if the chat is new then use post method, otherwise stick to the put as the new line will be added only.
            const data = {
                start_user: user.id,
                users: users,
                subject: messageDetails.subject,
                line: line
            }
            axios.post('api/chat', data)
                .then((response) => {
                    console.log(response)
                    setOpenChat(response.data.chat)
                })
        }
    }

    const updateLines = (line) => {
        const data = {
            start_user: user.id,
            users: messageDetails.users,
            subject: messageDetails.subject,
            line: line
        }
        axios.post(`api/update_chat/${openChat}`, data)
            .then((response) => {
                console.log(response)
                // setMessages(response.data.messages)
                getChat()
            })
            .catch((error) => {
                console.error(error)
            })
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
                                lastMessageTime={messageDetails.created_at}
                                users={messageDetails.users}
                            />
                            <div className="message-view-content">
                                {/* Use Data from backend and map it through this component to display
                            types of messages send from and to the dedicated user. */}
                                {Object.keys(messageDetails.lines).length > 0 ? messageDetails.lines.map((message) => (
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
