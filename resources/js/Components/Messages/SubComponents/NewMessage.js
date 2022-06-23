import React from 'react'
import Button from '../../Button'
import Contacts from './Contacts'

export default function NewMessage() {
    return (
        <div>
            {/* New Subject unique styling with full width */}
            <div className="messages-new-subject">
                <input className='messages-new-subject-input' placeholder='Create new subject here...' type='text' />
            </div>

            {/* Add Contacts component centered in the middle  */}
            <Contacts />

            {/* Add button that will confirm creation of new message */}

            <div>
                <Button
                    text={''}
                    type={''}
                    disabled={false}
                    color={''}
                    size={''}
                    icon={null}
                    callback={() => console.log('message should be create')}
                />
            </div>

        </div>
    )
}
