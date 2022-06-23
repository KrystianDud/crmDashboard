import React from 'react'
import '../../../css/globals.css'

import Button from '../Button/index'

import InboxHead from './SubComponents/InboxHead'

export default function Inbox() {
    return (
        <div className='messages-inbox flexColumn alignCenter'>
            <div className='flexRow justifyEnd'>
                <Button
                    text={'New Message'}
                    type={'contained'}
                    disabled={false}
                    color={'normal'}
                    size={'lg'}
                    icon={null}
                    callback={() => console.log('creating Message')}
                />
            </div>
            <div className="messages-inbox-container">
                <InboxHead />
            </div>
        </div>
    )
}
