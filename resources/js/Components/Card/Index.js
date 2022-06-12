import React from 'react'
import './index.css'
import '../../../css/globals.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faRightLeft, faPiggyBank } from '@fortawesome/free-solid-svg-icons'

const icons = {
    'faCreditCardFront': faCreditCard,
    'faRightLeft': faRightLeft,
    'faPiggyBank': faPiggyBank,

}

export default function Card({ icon, title, value }) {
    return (
        <div className="shape smooth-shadow flexColumn alignContentCenter flexBetween" >
            <FontAwesomeIcon size='xl' icon={icons[icon]}  />

            <div className='paragraphThin'>
                <p>{title}</p>
            </div>

            <div className='value-box'>
                {value}
            </div>

        </div>
    )
}
