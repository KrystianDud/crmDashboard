import React from 'react'
import './index.css';
import '../../../css/globals.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faAdd } from '@fortawesome/free-solid-svg-icons';

export default function IncrementButtonEnhanced({value}) {
    return (
        <div className='incrementButtonEnhanced-body' >
            <button className="incrementButtonEnhanced dangerColor" onClick={() => onClick(refItem, 'minus')}>
                <FontAwesomeIcon size='xl' icon={faMinus} />
            </button>

            <p>{value}</p>

            <button className="incrementButtonEnhanced normalColor" onClick={() => onClick(refItem, 'add')}>
                <FontAwesomeIcon size='xl' icon={faAdd} />
            </button>

        </div>
    )
}
