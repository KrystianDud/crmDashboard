import React, { cloneElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

import './index.css';
import '../../../css/globals.css';

export default function Modal({ type, title, confirmationMessage, cancelMessage, onClose, onAccept, BodyComponent, widthSize }) {
    const [writeData, setWriteData] = useState({})

    const onChange = (e) => {
        let object;

        if (e.target.type === 'file') {
            object = {
                ...writeData,
                [e.target.id]: e.target.files[0]
            }
        }
        else {
            object = {
                ...writeData,
                [e.target.id]: e.target.value
            }
        }

        setWriteData(object)
    }

    return (
        <div className='modal-container'>
            <div className="backdrop" />

            <div className='modal-box smooth-shadow' style={{width: widthSize}}>
                <div className="modal-head">
                    <h3 className='title'>{title}</h3>
                    <button className="close-icon" onClick={() => onClose()}>
                        <FontAwesomeIcon icon={faClose} size='lg' />
                    </button>
                </div>
                <div className="modal-content">
                    {cloneElement(BodyComponent, { onChange: (val) => onChange(val) }, null)}
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
                        callback={() => onAccept(writeData, type)}
                    />
                </div>
            </div>

        </div>
    )
}

