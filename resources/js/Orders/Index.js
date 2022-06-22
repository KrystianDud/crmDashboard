import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import { UserDataContext } from '../app'

import Table from '../Components/Table';
import ButtonRectangle from '../Components/IconButtons/ButtonRectangle';
import Button from '../Components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPaperclip, faList } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Orders({ user }) {
    const { userData, setUserData } = useContext(UserDataContext);

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const [active, setActive] = useState(0)
    const [filterView, setFilterView] = useState(false)
    const [currentList, setCurrentlist] = useState()

    // The reason for hardcoded columns is becuase sometimes there might be a 
    // chance that the name of the item for the table might have undescore which will result in bad UX
    // Later this should be moved to backend so it can return the tables based on the user verification approach
    const [columnsClient, setColumnsClient] = useState();

    useEffect(() => {
        console.log('parmas', user.id, user.company_id)

        axios.get('/api/orders', {
            params: {
                user_id: user.id,
                company_id: user.company_id
            }

        })
            .then((response) => {
                console.log(response)
                setCurrentlist(response.data.data)
                setColumnsClient(response.data.columns)
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
        <div style={{ height: '90%' }} >
            <div className='mainView'>
                <div className='table-control'>
                    <ButtonRectangle
                        icon={faFilter}
                        onClick={filterList}
                    />
                </div>
                {currentList && columnsClient ?
                    <Table
                        columns={columnsClient}
                        list={currentList}
                        showDetails={null}
                        options={true}
                        provideOptions={provideOptions}
                        editItem={null}
                        user={userData}
                    /> : null}
            </div>
        </div>
    )
} 