import React from 'react'
import './index.css';
import '../../css/globals.css'

import Card from '../Components/Card/Index'
import History from '../Components/History/index'

export default function 
Dashboard({user}) {
    return (
        <div className="viewWindow">
            <div className='fitW m15'>
                <h2>{`Welcome ${user.name}!`}</h2>
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

