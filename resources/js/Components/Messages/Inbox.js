import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../../css/globals.css'

import Button from '../Button/index'

import InboxHead from './SubComponents/InboxHead'

export default function Inbox({ user, updateMessageView }) {
    const [messages, setMessages] = useState([])
    const [selected, setSelected] = useState(null)

    const selectMessage = (id) => {
        setSelected(id)
        updateMessageView(id)
    }

    useEffect(() => {
        axios.get(`/api/chats/${user.id}`)
            .then((response) => {
                console.log(response)
                setMessages(response.data.messages)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [user])

    return (
        <div className="messages-inbox-container">
            {messages.length > 0 ? messages.map((message) => (
                <InboxHead
                    key={message.id}
                    selected={selected == message.id}
                    message={message}
                    onClick={() => selectMessage(message.id)}
                />
            )) : null}
        </div>
    )
}
