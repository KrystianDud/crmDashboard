import React from 'react'
import Input from '../../Global/Input';

import Contact from './Contact';

export default function Contacts() {
    return (
        <div className='messages-contacts-container flexColumn alignStart w100'>
            <p>Add people to this conversation: </p>
            <Input
                label={''}
                type={'text'}
                placeholder={'Search users...'}
                margin={'15px 0'}
                className='w100'
            />

            <div className='flexRow'>
                <Input
                    label={'Your company'}
                    type={'checkbox'}
                    placeholder={'Search users...'}
                    margin={'15px 0'}
                    // style={{display: 'flex', flexDirection: 'row'}}
                    className='flexRowRev'
                />
                <Input
                    label={'Service'}
                    type={'checkbox'}
                    placeholder={'Search users...'}
                    margin={'15px 0'}
                    className='flexRowRev'
                />
            </div>

            <p>People list in your reach:</p>
            {/* TODO Make sure that that placeholder text will be present if no contacts but it will be unlikely to happen */}
            {/* TODO Provide the bookmarks for the available names */}

            <Contact />

        </div>
    )
}
