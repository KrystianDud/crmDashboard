import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'

export default function MessageViewSplash() {
    return (
        <div className='h100'>
            <div>
                <FontAwesomeIcon size='10x' icon={faEnvelopeOpen} className="m50P"/>
            </div>
        </div>
    )
}
