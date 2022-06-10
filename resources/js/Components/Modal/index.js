import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

import './index.css';
import '../../../css/globals.css';

export default function Modal({ title, confirmationMessage, cancelMessage, onClose, onAccept, ...props }) {
    const func = () => {

    }
    return (
        <div className='modal-container'>
            <div className="backdrop" />

            <div className='modal-box smooth-shadow'>
                <div className="modal-head">
                    <h3 className='title'>{title}</h3>
                    <button className="close-icon" onClick={() => onClose()}>
                        <FontAwesomeIcon icon={faClose} size='lg' />
                    </button>
                </div>
                <div className="modal-content">
                    {props.children}
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
                        callback={() => onAccept()}
                    />
                </div>
            </div>

        </div>
    )
}

