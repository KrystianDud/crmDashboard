import React from 'react'
import './index.css';
import '../../../css/globals.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faAdd } from '@fortawesome/free-solid-svg-icons';

export default function IncrementButton({onClick, refItem}) {
    // To do enhance the buttons with the icons
    return (
        <div className='incrementContainer flexRow justifyCenter alignCenter'>
            <button className="incrementButton dangerColor" onClick={() => onClick(refItem, 'minus')}>
                <FontAwesomeIcon size='xl' icon={faMinus} />
            </button>
            <button className="incrementButton normalColor" onClick={() => onClick(refItem, 'add')}>
                <FontAwesomeIcon size='xl' icon={faAdd} />
            </button>
            
        </div>
    )
}
