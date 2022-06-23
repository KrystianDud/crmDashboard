import React from 'react'
import { faStar, faTrash, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../css/globals.css'

export default function Toolbar() {
    return (
        <div className="messages-toolbar flexColumn flexCenter h100 ">
            <div className='flexColumn flexCenter'>
                <div className='mb15 fitW fitH'>
                    <FontAwesomeIcon size='xl' icon={faStar} />
                </div>
                <div className='mb15 fitW fitH'>
                    <FontAwesomeIcon size='xl' icon={faTrash} />
                </div>
                <div className='mb15 fitW fitH'>
                    <FontAwesomeIcon size='xl' icon={faEnvelopeOpen} />
                </div>
            </div>
            <div className="h100 border-grey-secondary"></div>
        </div>
    )
}
