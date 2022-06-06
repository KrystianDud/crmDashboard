import React, { useState, useEffect } from 'react'
import './index.css'
import { v4 as uuidv4 } from 'uuid';
import Tablist from '../Components/Tablist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPaperclip } from '@fortawesome/free-solid-svg-icons'

import ListBox from '../Components/ListBox/Index';

export default function Orders() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const [active, setActive] = useState(0)
    const [filterView, setFilterView] = useState(false)
    const [currentList, setCurrentlist] = useState()

    useEffect(
        () => {
            const update = (e) => {
                if (e.target.closest('path') || e.target.closest('svg')) return

                if (e.target.className.includes('listBoxButton') && !filterView) {
                    let left = e.target.offsetLeft
                    let top = e.target.offsetTop
                    let height = e.target.offsetHeight
                    let width = e.target.offsetWidth

                    if (e.target.offsetLeft > (window.innerWidth / 2)) {
                        setX((left - width) + 'px')
                        setY(top + height + 'px')
                    }
                    else {
                        setX(left + width + 'px')
                        setY(top + height + 'px')

                    }

                    setFilterView(true)
                }
                else if (e.target.className.includes('listBox')) setFilterView(true)
                else if ((!e.target.className.includes('listBoxButton') || !e.target.className.includes('listBox')) && filterView) setFilterView(false)
                else {
                    setFilterView(false)
                }

            }
            window.addEventListener('mousemove', update)
            window.addEventListener('touchmove', update)
            return () => {
                window.removeEventListener('mousemove', update)
                window.removeEventListener('touchmove', update)
                setFilterView(false)
            }
        },
        [setX, setY]
    )

    const filterList = (filterId) => {
        setActive(filterId)

        switch (filterId) {
            case 0:
                // show All
                break;
            case 1:
        }
    }

    const filterTable = (e) => {


    }

    const attachments = (e) => {

    }
    return (
        <div style={{height: '90%'}} >
            <ListBox
                show={filterView}
                list={['Sort by', 'Declined', 'Accepted', 'Fullfiled']} // array
                position={{ x: x, y: y }}
            />

            <div className='showTabs'>
                {tabs.map(({ name }, index) => (
                    <Tablist
                        key={`tab${index}`}
                        func={filterList}
                        name={name}
                        activeTab={active}
                        index={index}

                    />
                ))}
            </div>


            <div className='tableView'>
                <div className='table-control'>
                    <button className='button-secondary listBoxButton' onClick={(e) => console.log()}>
                        <FontAwesomeIcon icon={faFilter} /> Filter
                    </button>
                    <button className='button-secondary' onClick={() => attachments()}>
                        <FontAwesomeIcon icon={faPaperclip} /> Attachment
                    </button>

                </div>

                <table className='table table-spacer'>
                    <tbody>
                        <tr className='table-header'>
                            <td>order ID</td>
                            <td>Customer</td>
                            <td>Order</td>
                            <td>Date</td>
                            <td>Price</td>
                        </tr>
                        {orderHistory.map(({ id, customer, order, date, price }, index) => (
                            <tr className='w row' key={index}>
                                <td className='table-element '>{id.slice(0, 8)}</td>
                                <td className='table-element '>{customer}</td>
                                <td className='table-element '>{order}</td>
                                <td className='table-element '>{date}</td>
                                <td className='table-element '>{price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const tabs = [
    {
        name: 'All Orders'
    },
    {
        name: 'Declined'
    }
]


const orderHistory = [
    {
        id: uuidv4(),
        customer: 'Chenai Novak',
        order: '',
        date: '10/04/2022',
        price: '$100'
    },
    {
        id: uuidv4(),
        customer: 'Lexi-May Travis',
        order: '',
        date: '10/04/2022',
        price: '$100'
    },
    {
        id: uuidv4(),
        customer: 'Maison Bryan',
        order: '',
        date: '10/04/2022',
        price: '$100'
    },
    {
        id: uuidv4(),
        customer: 'Anjali Talley',
        order: '',
        date: '10/04/2022',
        price: '$100'
    },
    {
        id: uuidv4(),
        customer: 'Reese Delaney',
        order: '',
        date: '10/04/2022',
        price: '$100'
    },
    {
        id: uuidv4(),
        customer: 'Ella-Rose Schofield',
        order: '',
        date: '10/04/2022',
        price: '$100'
    },
    {
        id: uuidv4(),
        customer: 'Kendra Dolan',
        order: '',
        date: '10/04/2022',
        price: '$100'
    },
    {
        id: uuidv4(),
        customer: 'Sila Austin',
        order: '',
        date: '10/04/2022',
        price: '$100'
    },
]






// Elisabeth White
// Maddy Ross
// Rayan Osborne
// Tamar Berry
// Jude Petty
// Monique Fulton
// Dougie Swanson
// Ela Cousins
// Chance Mac
// Clay Charlton
// Eesa Contreras
// Bjorn Matthams
// Rosa Bonner
// Neve Carty
// Charlie Keith
// Misty Seymour
// Shiv Gibbs
// Faizan Atkinson
// Ceara Bain
// Summer-Louise Mcpherson
// Michael Churchill
// Hari Grainger
// Dione Chester
// Amin Boyle
// Adil Magana
// Archie Bellamy
// Liyah Higgins
// Jadine Stein
// Renee Roy
// Kay Wormald
// Johnathon Compton
// Chantel Wallis
// Jedd Nava
// Zoha Crowther
// Blake Wilder
// Rowan Sutherland
// Carys Abbott
// Mary Dunne
// Luqman Pope
// Hibba Shepard
// Onur Mcgowan
// Hubert O'Reilly