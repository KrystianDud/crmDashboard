import React, { useState, useEffect } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';

import { UserDataContext } from '../app'

import Tablist from '../Components/Tablist';
import Table from '../Components/Table';
import ButtonRectangle from '../Components/IconButtons/ButtonRectangle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPaperclip, faList } from '@fortawesome/free-solid-svg-icons';

export default function Orders() {
    const { userData, setUserData } = useContext(UserDataContext);

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const [active, setActive] = useState(0)
    const [filterView, setFilterView] = useState(false)
    const [currentList, setCurrentlist] = useState()

    // The reason for hardcoded columns is becuase sometime there might be a 
    // chance that the name of the item for the table might have undescore which will result in bad UX
    const [columns, setColumns] = useState([
        {
            name: 'Id',
            keyName: 'id'
        },
        {
            name: 'Customer',
            keyName: 'customer'
        },
        {
            name: 'Order',
            keyName: 'order'
        },
        {
            name: 'Date',
            keyName: 'date'
        },
        {
            name: 'Price',
            keyName: 'price'
        },
    ]);

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
        // provide the functionality to show the small dialog
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

    const viewType = () => {
    }

    return (
        <div style={{ height: '90%' }} >
            <div className='mainView'>
                <div className='table-control'>
                    <ButtonRectangle
                        icon={faFilter}
                        onClick={filterList}
                    />
                </div>
                <Table
                    columns={columns}
                    list={orderHistory}
                    showDetails={null}
                    options={false}
                    editItem={null}

                    user={userData}

                />
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
]; 