import React, { cloneElement, useEffect, useState } from 'react';
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
export default function Modal({ sendRequest, title, confirmationMessage, cancelMessage, onClose, onAccept, BodyComponent, widthSize, activationData }) {
    const [computedData, setComputedData] = useState(null);

    const sendData = () => {
        sendRequest(computedData, onAccept);
    }

    const disableControl = () => {
        if (activationData) {
            let confirmedDataArray = [];
            Object.keys(computedData).forEach((item) => {
                for (let i = 0; i < activationData.length; i++) {
                    if (confirmedDataArray.length == activationData.length) {
                        return true
                    }
                    if (item == activationData[i] && computedData[activationData[i]].length > 1) {
                        confirmedDataArray.push(i)
                        console.log('disableControl value name', computedData[activationData[i]], '  key  ', item)
                    }
                }
            })
        }
        return false
    }

    return (
        <div className='modal-container'>
            <div className="backdrop" />

            <div className='modal-box smooth-shadow' style={{ width: widthSize }}>
                <div className="modal-head">
                    <h3 className='title'>{title}</h3>
                    {disableControl() ? <button className="close-icon" onClick={() => onClose()}>
                        <FontAwesomeIcon icon={faClose} size='lg' />
                    </button> : false}
                </div>
                <div className="modal-content">
                    {cloneElement(BodyComponent, { computedData, setComputedData }, null)}
                </div>
                <div className="modal-footer">
                    <Button
                        text={cancelMessage}
                        type={'outlineDanger'}
                        disabled={disableControl() ? true : false}
                        color={''}
                        size={'lg'}
                        icon={null}
                        callback={() => onClose()}
                    />
                    <Button
                        text={confirmationMessage}
                        type={'contained'}
                        disabled={disableControl() ? true : false}
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

