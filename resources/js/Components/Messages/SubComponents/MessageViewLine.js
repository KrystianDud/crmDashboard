import React, { useEffect, useLayoutEffect, useState } from 'react'

export default function MessageViewLine({users, user}) {
    const [first, setfirst] = useState(second)
    useLayoutEffect(() => {
        // When messages array updates get last item

    }, [messages])

    
    
    return (
        <div className='flexRow'>
            <div
                className="messages-inbox-profile m5"
                style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}
            />
            <div className="messages-inbox-text-box flexColumn alignStart">
                <div className="messages-inbox-message">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore 
                    magna aliquyam
                </div>
                <div className="messages-inbox-message-time">
                    8:00 AM
                </div>
            </div>
        </div>
    )
}
