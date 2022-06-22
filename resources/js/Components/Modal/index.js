import React, { cloneElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

import './index.css';
import '../../../css/globals.css';
import axios from 'axios';
/**
 * 
 * @param {*} param0 
 * @returns 
 * send data using the api from the 'modalData'
 * remove any data controllers from this component as this is reusable and universal component
 * ensure that the computed data state is in a appropiate format to be ready for the api request. 
 */
export default function Modal({ api, apiParameter, type, title, confirmationMessage, cancelMessage, onClose, onAccept, BodyComponent, widthSize }) {
    const [computedData, setComputedData] = useState(null);
    const sendData = (e) => {
        axios(api, {
            method: 'POST',
            data: computedData
        })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    onAccept(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .then(() => {
            })
    }

    return (
        <div className='modal-container'>
            <div className="backdrop" />

            <div className='modal-box smooth-shadow' style={{ width: widthSize }}>
                <div className="modal-head">
                    <h3 className='title'>{title}</h3>
                    <button className="close-icon" onClick={() => onClose()}>
                        <FontAwesomeIcon icon={faClose} size='lg' />
                    </button>
                </div>
                <div className="modal-content">
                    {cloneElement(BodyComponent, { computedData, setComputedData }, null)}
                </div>
                <div className="modal-footer">
                    <Button
                        text={cancelMessage}
                        type={'outlineDanger'}
                        disabled={false}
                        color={''}
                        size={'lg'}
                        icon={null}
                        callback={() => onClose()}
                    />
                    <Button
                        text={confirmationMessage}
                        type={'contained'}
                        disabled={false}
                        color={'normal'}
                        size={'lg'}
                        icon={null}
                        callback={() => sendData()}
                    />
                </div>
            </div>

        </div>
    )
}

