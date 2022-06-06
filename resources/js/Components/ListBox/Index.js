import React from 'react'
import './Index.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPaperclip } from '@fortawesome/free-solid-svg-icons'

export default function ListBox(props) {
    return (
        <div>
            {props.show ?
                <div className='listBox smooth-shadow' style={{top: props.position.y, left: props.position.x}}>
                    {props.list.map((item, index) => (
                        <div key={'list'+index}> 
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
                : null}
        </div>
    )
}
