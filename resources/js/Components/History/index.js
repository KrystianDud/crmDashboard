import React from 'react'

import '../Card/index.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'


export default function index() {
    return (
        <div className='box-section smooth-shadow'>
            <div className='title'>
                <h3 className='no-margin' >History</h3>
                <p className='subtitle text-left'>Last week transactions</p>
            </div>

            <table className='table subtitle'>
                <tbody>
                    {transactionHistory.map(({ user, text, date, value, icon }, index) => (
                        <tr className='row' key={index}>
                            <td className='table-element'>{user}</td>
                            <td className='table-element'>{text}</td>
                            <td className='table-element'>{date}</td>
                            <td className='table-element'>{value}</td>
                            <td className={`table-element ${icon}`}>{<FontAwesomeIcon className={icon} icon={icon === 'in' ? faArrowDown : faArrowUp}  />}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

const transactionHistory = [
    {
        user: 'Alfreds Futterkiste',
        text: 'Car Insurance',
        date: '10/04/2022',
        value: '$300',
        icon: 'out'
    },
    {
        user: 'Joe Doe',
        text: 'Meal',
        date: '9/04/2022',
        value: '$30',
        icon: 'in'
    },
    {
        user: 'Timothy Stephens',
        text: 'Meds',
        date: '10/04/2022',
        value: '$150',
        icon: 'in'
    },
    {
        user: 'John Kowalsky',
        text: 'Online payment',
        date: '10/04/2022',
        value: '$1200',
        icon: 'in'
    },
    {
        user: 'Francis Burne',
        text: 'Charity event',
        date: '10/04/2022',
        value: '$600',
        icon: 'out'
    }
]