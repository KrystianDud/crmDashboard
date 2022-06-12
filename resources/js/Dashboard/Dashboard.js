import React, { useContext } from 'react'
import './index.css';
import '../../css/globals.css'

import Card from '../Components/Card/Index'
import History from '../Components/History/index'
import Reminder from '../Components/Reminder';

import { UserDataContext } from '../app'

export default function Dashboard({ user, activateModal }) {
    const { userData, setUserData } = useContext(UserDataContext);
    console.log('user context', userData)

    return (
        <div className="viewWindow">
            <div className='fitW m15'>
                <h2>{`Welcome ${user}!`}</h2>
            </div>

            <div className="userReminder m20">
                {/* provide to user reminder a number of things to do in a specific order
                    to ensure that client can carry out specific actions.
                    ### First, fill in company details. this should open a modal and provide billing address and etc.
                    This will not include email confirmation.
                */}
                <Reminder
                    userData={userData}
                    onStart={(modalData) => activateModal(modalData)}
                />
            </div>

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

