import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import { UserDataContext } from '../app'

import Table from '../Components/Table';
import ButtonRectangle from '../Components/IconButtons/ButtonRectangle';
import Button from '../Components/Button';
import Slider from './Slider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPaperclip, faList } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Orders({ user }) {
    const { userData, setUserData } = useContext(UserDataContext);

    const [active, setActive] = useState(0);
    const [filterView, setFilterView] = useState(false);
    const [currentTransactions, setCurrentTransactions] = useState(null);
    const [sliderData, setSliderData] = useState(null)
    const [columnsClient, setColumnsClient] = useState(null);


    useEffect(() => {
        axios.get('/api/orders', {
            params: {
                user_id: user.id,
                company_id: user.company_id
            }

        })
            .then((response) => {
                console.log(response)
                setSliderData(response.data.slider)
                setColumnsClient(response.data.columns)
                setCurrentTransactions(response.data.transactions)
            })

    }, [user])


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

    // When the options are set to true on the table we can provide them in the parent
    // Due to the fact that not always table will have this functionality and also they might need
    // to be configured in different ways depending on the client and service needs
    const provideOptions = (
        <Button
            text={'View'}
            type={'contained'}
            disabled={false}
            color={'normal'}
            size={'sm'}
            icon={null}
            callback={() => editItem(index)}
        />
    );

    return (
        <div className='viewWindow'>
            <div className='table-control'>
                <ButtonRectangle
                    icon={faFilter}
                    onClick={filterList}
                />
            </div>
            {currentTransactions && columnsClient ?
                <Table
                    columns={columnsClient}
                    list={currentTransactions}

                    showDetails={null}
                    options={true}
                    provideOptions={provideOptions}
                    editItem={null}

                    showSlider={true}
                    sliderData={sliderData}
                /> : null}
        </div>
    )
} 