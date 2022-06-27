import React, { useEffect, useState } from 'react'
import Input from '../../Global/Input';

import Contact from './Contact';

/**
 * FRONTEND has authority to sort the user data here once the user list is retrived from the  backend.
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Contacts({ orgOptions, update, users, selectedUserList, selectContact }) {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        setUserList(users)
    }, [users])

    const searchName = (key) => {
        const searchTerm = key.toLowerCase()
        const expression = new RegExp(searchTerm, 'g');

        // provide additional fields using the pattern below to search through the company and positions as well.
        return users.filter(value => {
            return value.name.toLowerCase().match(expression)
        })
    }

    const onChange = async (val) => {
        if (val.length > 2) {
            let search = await searchName(val)
            setUserList(search)
        }
        else {
            setUserList(users)
        }
    }

    return (
        <div className='messages-contacts-container flexColumn alignStart w100'>
            <p>Add people to this conversation: </p>
            <Input
                label={''}
                type={'text'}
                placeholder={'Search users...'}
                margin={'15px 0'}
                className='w100'
                onChange={(e) => onChange(e.target.value)}
            />

            <div className='flexRow'>
                <Input
                    id='company'
                    label={'Your company'}
                    type={'checkbox'}
                    checked={orgOptions.company}
                    placeholder={'Search users...'}
                    margin={'15px 0'}
                    // style={{display: 'flex', flexDirection: 'row'}}
                    className='flexRowRev'
                    onChange={(e) => update(e.target.id, e.target.checked)}
                />
                <Input
                    id='service'
                    label={'Service'}
                    type={'checkbox'}
                    checked={orgOptions.service}
                    placeholder={'Search users...'}
                    margin={'15px 0'}
                    className='flexRowRev'
                    onChange={(e) => update(e.target.id, e.target.checked)}
                />
            </div>

            <p>People list in your reach:</p>
            {/* TODO Make sure that that placeholder text will be present if no contacts but it will be unlikely to happen */}
            {/* TODO Provide the bookmarks for the available names */}
            {typeof userList != 'undefined' ? userList.map(item => (
                <Contact
                    key={item.id}
                    user={item}
                    onClick={() => selectContact(item.id)}
                    selected={selectedUserList.filter(u => u.id == item.id)[0]}
                />
            )) : null}


        </div>
    )
}
