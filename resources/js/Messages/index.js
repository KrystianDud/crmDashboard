import React, { useState, useEffect } from 'react'
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
    const [chatId, setChatId] = useState(null)

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [messageDetails, setMessageDetails] = useState({})

    useEffect(() => {
        if (chatId) {
            getChat()
        }
    }, [chatId])


    const updateActiveChatId = (id) => {
        setChatId(id)
    }

    const setScreenView = (num) => {
        setView(num)
        setChatId(null)
    }

    const updateMessageView = (subject, users) => {
        setChatId(null)

        setMessageDetails({ subject: subject })
        setUsers(users)
        setScreenView(2)
    }

    const getChat = () => {
        axios.get(`api/chat/${chatId}`)
            .then((response) => {
                // user_id, user_avatar, line, created_at
                setUsers(response.data.data.users)
                setMessageDetails(response.data.data.chat)
                setView(2)

            })
            .catch((error) => {
                console.error(error)
            })
    }

    const sendMessage = (line) => {
        if (!chatId) {
            createMessage(line)
        }
        else {
            updateLines(line)
        }
    }

    const createMessage = (line) => {
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
                setChatId(response.data.chat)
            })

    }

    const updateLines = (line) => {
        const data = {
            start_user: user.id,
            users: messageDetails.users,
            subject: messageDetails.subject,
            line: line
        }
        axios.post(`api/update_chat/${chatId}`, data)
            .then((response) => {
                // setMessages(response.data.messages)
                getChat()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div className="viewWindow flex">
            <div className="messages-window flexRow m15 w100">
                <Toolbar />

                <div className='messages-inbox flexColumn alignCenter '>
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
                        updateActiveChatId={updateActiveChatId}
                    />
                </div>

                <MessageView
                    user={user}
                    view={view}
                    updateMessageView={updateMessageView}

                    sendMessage={sendMessage}
                    messageDetails={messageDetails}
                    users={users}
                    messages={messages}
                />
            </div>
        </div>
    )
}
