import React from 'react'

import '../index.css'
import '../../../../css/globals.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'



export default function MessageViewSplash() {
    return (
        <div className='messages-message-splash'>
            <FontAwesomeIcon size='10x' icon={faEnvelopeOpen} className='color-grey-secondary'/>
        </div>
    )
}
