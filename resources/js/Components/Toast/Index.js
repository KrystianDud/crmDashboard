import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { uniqueId } from 'lodash'

import '../../../css/globals.css'
import './index.css'

/**
 * 
 * @param {type} - Info, Success, Warning, Danger 
 * @returns 
 */

export const newToast = (message, type) => {
    return { id: uniqueId(), message: message, type: type };
}

export default function Toast({ toastList, autoDelete, autoDeleteTime }) {
    const [list, setList] = useState([]);
    
    useEffect(() => {
        setList([...toastList])
    }, [toastList])


    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {

                deleteToast(toastList[0].id);
            }
        }, autoDeleteTime);

        return () => {
            clearInterval(interval);
        }
    }, [toastList, autoDelete, autoDeleteTime, list]);


    const deleteToast = id => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    }


    return (
        <div className='toastBoxContainer'>
            {list.map((item, index) => (
                <div key={`toast${item.id}`} className={` b${item.type} top-right border box smooth-shadow flexRow flexBetween toastContainer`}>
                    <div className="textWindow mInline15">
                        <p className='paragraphMedium'>{item.type}</p>
                        <p className='paragraphThin'>{item.message}</p>
                    </div>
                    <div className="exitWindow ">
                        <div className="closeIcon flex flexCenter justifyCenter">
                            <FontAwesomeIcon icon={faClose} onClick={() => deleteToast(item.id)} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
} 
