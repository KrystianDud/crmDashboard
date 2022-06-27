import React, { useContext, useEffect, useState } from 'react'

import '../../../../css/globals.css'
import Button from '../../Button'
import Contacts from './Contacts'


import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { NewToast } from '../../Toast/Index'
import { ToastContext } from '../../../app'

export default function NewMessage({ user, updateMessageView }) {
    const [userList, setUserlist] = useState([])
    const [orgOptions, setOrgOptions] = useState({
        company: false,
        service: false
    })

    const [subject, setSubject] = useState('')
    const [selectedUserList, setSelectedUserList] = useState([])

    const { toastList, setToastList } = useContext(ToastContext);

    useEffect(() => {
        axios.get(`/api/users/${user.id}`)
        .then((response) => {
            console.log(response.data.users)
            setUserlist(response.data.users)
        })
        .catch((error) => {
            console.error(error)
        })
    }, [])
    

    const updatOrganisationOptions = (id, bool) => {
        if (id == 'company') {
            setOrgOptions({ ...orgOptions, company: bool })
        } else {
            setOrgOptions({ ...orgOptions, service: bool })
        }
    }

    const selectContact = (id) => {
        let containsItem = selectedUserList.filter(item => item.id == id)[0]
        let contact
        if (containsItem) {
            contact = userList.filter(user => user.id != id)
            setSelectedUserList([...contact])
        }
        else {
            contact = userList.filter(user => user.id === id)
            setSelectedUserList([...selectedUserList, ...contact])
        }
    }

    const createChat = () => {
        // validate values to allow for the creating the message
        if (subject.length < 5) {
            setToastList([...toastList, NewToast('The subject is too short!', 'Warning')])
            return
        }

        if (selectedUserList.length < 1) {
            setToastList([...toastList, NewToast('Please select at least one contact!', 'Warning')])
            return
        }

        updateMessageView()
    }

    return (
        <div className='h100 flexColumn justifyBetween alignCenter'>
            {/* New Subject unique styling with full width */}
            <div className="messages-new-subject">
                <input className='messages-new-subject-input' placeholder='Create new subject here...' type='text' onChange={(e) => setSubject(e.target.value)} />
            </div>

            {/* Add Contacts component centered in the middle  */}
            <Contacts
                orgOptions={orgOptions}
                update={updatOrganisationOptions}
                users={userList}

                selectedUserList={selectedUserList}
                selectContact={selectContact}
            />

            {/* Add button that will confirm creation of new message */}

            <div className='w100 flexRow justifyEnd'>
                <Button
                    text={'Create'}
                    type={'contained'}
                    disabled={false}
                    color={'normal'}
                    size={'lg'}
                    icon={faPaperPlane}
                    callback={() => createChat()}
                />
            </div>

        </div>
    )
}
