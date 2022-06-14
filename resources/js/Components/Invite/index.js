import React, { useContext } from 'react';
import './index.css'
import Button from '../Button';

import { newToast } from '../Toast/Index';
import { ToastContext } from '../../app';

export default function Invite(company) {
    const { toastList, setToastList } = useContext(ToastContext);

    const copyLink = () => { 
        const companyData = Object.values(company)[0]

        const href = window.location.href
        const companyShareLogin = `${href}api/register/${companyData.id}`;

        navigator.clipboard.writeText(companyShareLogin);
        
        let message = 'The link was copied successfully!';
        setToastList([...toastList, newToast(message, 'Success')]);
    }
    return (
        <div className='flex flexColumn invite m20 smooth-shadow'>
            <h5>Invite users to join the platform.</h5>
            <Button
                text={'Copy Link'}
                type={'outlineSuccess'}
                disabled={false}
                color={''}
                size={'sm'}
                icon={null}
                callback={() =>  copyLink()}
            />
        </div>
    )
}
