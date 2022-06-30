import React, { useContext, useEffect } from 'react'
import './index.css';
import '../../css/globals.css'

import Card from '../Components/Card/Card'
import History from '../Components/History/index'
import Reminder from '../Components/Reminder';
import Invite from '../Components/Invite';
import { UserDataContext, CompanyDataContext } from '../app'
import { isEmpty } from 'lodash';

export default function Dashboard({ user, activateModal }) {
    const { userData, setUserData } = useContext(UserDataContext);
    const { companyData, setCompanyData } = useContext(CompanyDataContext);

    useEffect(() => {
        console.log(user)
    }, [])
    
    useEffect(() => {
        checkReminders()
    }, [userData])

    const checkReminders = () => {
        // In this function we check onboarding users, especially admins to see if they did everything to make sure that platform runs smoothly
        // using axios we will connect to the server to seek confirmation if things such as: 
        // company details, ADD MORE REASONS HERE
        // Then an array will be created and passed to the reminder component to display one after another
        // Reminders should be hardcoded and the content provided inside of the Component using switch
        // Reminders should be part of the userData and be available through the context hook

        // Provide dummy context until the Api is in place
        // const reminderContext = ['company'];
        // const userItems = userData;

        // userItems.reminderContext = reminderContext;
        // setUserData(userItems)
    }

    const displayReminders = (
        userData.type == 'client' && userData.reminderContext && userData.reminderContext.length > 0 ?
            <div className="userReminder m20">
                {/* 
                provide to user reminder a number of things to do in a specific order
                to ensure that client can carry out specific actions.
                ### First, fill in company details. this should open a modal and provide billing address and etc.
                This will not include email confirmation.
            */}
                <Reminder
                    reminderContext={userData.reminderContext}
                    onStart={(modalData) => activateModal(modalData)}
                    user={userData}
                />
                {/* invite can be displayed only when the admin has created company */}

                {companyData.id && userData.privilege == 'admin' ? <Invite company={companyData} /> : null}
            </div>
            : null
    )

    return (
        <div className="viewWindow">
            <div className='fitW m15'>
                <h2>{`Welcome ${typeof user != 'undefined' ? user.name : ''}!`}</h2>
            </div>
            {user ? displayReminders : null}
            <div className='card-inline'>
                {cardElements.map(({ icon, title, value }, index) => (
                    <Card
                        key={index}
                        icon={icon}
                        title={title}
                        value={value}
                    />
                ))}
            </div>


            <History />
        </div>
    )
}

const cardElements = [
    {
        icon: 'faCreditCardFront',
        title: 'Card payments',
        value: '$1200'
    },
    {
        icon: 'faRightLeft',
        title: 'Recent Transfers',
        value: '$3700'
    },
    {
        icon: 'faPiggyBank',
        title: 'Savings',
        value: '$500'
    },
]

