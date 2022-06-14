import React from 'react'
import './index.css';
import '../../../css/globals.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons'

import Button from '../Button/index'
import CompanyDetails from '../Modal/ModalBody/CompanyDetails';

/**
 * 
 * @param {*} onStart 
 * @param {*} context 
 * @returns 
 */
export default function Reminder({ onStart, reminderContext }) {
    const prepareData = () => {
        console.log(reminderContext)
        if (reminderContext.length > 0) {
            switch (reminderContext[0]) {
                case 'company':
                    let data = {
                        type: 'companyDetails',
                        title: 'Company Details',
                        confirmationMessage: 'Confirm',
                        cancelMessage: 'Dismiss',
                        component: <CompanyDetails />
                    }
                    onStart(data)
                    break;

                default:
                    break;
            }
        }
    }
    return (
        <div className='reminder-body '>
            <div className="reminder-content smooth-shadow flexRow alignCenter">
                <FontAwesomeIcon className='m15' size='xl' width='40px' icon={faBusinessTime} style={{ flexGrow: 0 }} />

                <div className='flexColumn alignEnd'>
                    {/* <h3>Reminder!</h3> */}
                    <p className='paragraphThin'>Start With updating your company details. Make sure to provide all details correctly.</p>
                    <Button
                        text={'Start Now'}
                        type={'outlineSuccess'}
                        disabled={false}
                        color={''}
                        size={'sm'}
                        icon={null}
                        callback={() => prepareData()}
                    />
                </div>
            </div>
        </div>
    )
}
