import React from 'react'
import '../index.css'

import Button from '../../Button/index.js'

export default function ComposeMessage() {
    return (
        <div className='message-compose-box flexRow alignCenter justifyBetween'>
            <textarea  className='message-compose-input' type="text" />
            <div className="messages-compose">
                <Button
                    text={'Send'}
                    type={'Contained'}
                    disabled={false}
                    color={'normal'}
                    size={'lg'}
                    icon={null}
                    callback={() => console.log('this should send a message')}
                />
            </div>
        </div>
    )
}
