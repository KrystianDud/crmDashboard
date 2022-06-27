import React, { useState } from 'react'
import '../index.css'

import Button from '../../Button/index.js'

export default function ComposeMessage({ sendMessage }) {
    const [line, setLine] = useState('');

    const onChange = (val) => {
        setLine(val)
    }
    return (
        <div className='message-compose-box flexRow alignCenter justifyBetween'>
            <textarea
                className='message-compose-input'
                type="text"
                onChange={(e) => onChange(e.target.value)}
            />

            <div className="messages-compose">
                <Button
                    text={'Send'}
                    type={'Contained'}
                    disabled={false}
                    color={'normal'}
                    size={'lg'}
                    icon={null}
                    callback={() => sendMessage(line)}
                />
            </div>
        </div>
    )
}
