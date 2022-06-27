import React, { useState, useEffect } from 'react'
import './index.css'
import '../../css/index.css'
import Welcome from '../Components/Login/Welcome'
import LoginView from '../Components/Login/LoginView'
import RegisterView from '../Components/Login/RegisterView'
import SplashView from '../Components/Login/SplashView'
import axios from 'axios';

import Toast, { NewToast } from '../Components/Toast/Index'

export default function Login({ processUser, block }) {
    const [newUser, setNewUser] = useState(true)
    const [toastList, setToastList] = useState([])
    const [comapnyToken, setCompanyToken] = useState('')
    useEffect(() => {
        const companyIdToken = window.location.search

        // Check on load what cookies are in there. 
        // If sign of token then assume that user has visited page before thus will prefer login page.
        if (document.cookie.includes('Bearer')) setNewUser(false)
    }, [])

    const verifyCredidentials = (data, type) => {
        let newData = data;

        if (newData.email === '' || !newData.email.includes('@')) {
            setToastList([...toastList, NewToast('Email structure is not correct', 'Warning')])
            return
        }
        // This is not real token. this is saved string associated with the specific company from the email.
        // This will ensure solid authenticity for the not real application.
        // of course this should never take place in the real world implementation!!!!
        if (window.location.search.length > 255) {
            const sanitiseToken = window.location.search.slice(5);
            newData.company_id_token = sanitiseToken
        }

        if ((!block && newData.type) || (block && !newData.type)) {
            newData.type = 'service';
        }
        else {
            newData.type = 'client';
        }

        console.log(type)

        // During the registration process it would be good to create a client company in db 
        // provided that type and company names are in the newData obj
        let loginHeader, registrationHeader;
        if (type == 'login') {
            // const cookieValue = document.cookie
            //     .split('; ')
            //     .find(row => row.startsWith('Bearer'))
            //     .split('=')[1];
            const cookieValue = JSON.parse(localStorage.getItem('userData'));

            loginHeader = {
                'content-type': 'application/json',
                'Authorization': `Bearer=${cookieValue}`
            }
        }
        else if (type == 'register') {
            registrationHeader = {
                'content-type': 'application/json',
            }
        }
        else {
            return
        }

        axios({
            method: 'POST',
            url: `api/${type}`,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(newData)
        })
            .then((response) => {
                if (response.status == 200) {
                    console.log(response)
                    let user = response.data.user;
                    let userData = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        type: user.type,
                        company_id: user.company_id,
                        privilege: user.privilege,
                    }
                    if (typeof user.type != 'undefined' || user.type != '') {
                        const type = { type: user.type }
                        Object.assign(userData, type)
                    }
                    localStorage.setItem('token', JSON.stringify(response.data.token))

                    processUser(userData)
                }
                else if (response.status == 201) {
                    setToastList([...toastList, NewToast('New account has been created', 'Success')])
                    setNewUser(false)
                    localStorage.setItem('token', JSON.stringify(response.data.token))
                }
                else {
                    setToastList([...toastList, NewToast('User cannot be verified.', 'Warning')])
                }
            })
            .catch((error) => {
                setToastList([...toastList, NewToast('Something went wrong, please try again.', 'Warning')])
                console.error('some details are incorrect', error)
            })
    }

    const changeView = () => {
        setNewUser(!newUser)
    }


    return (
        <div className='authView'>
            <div className={`interactView ${newUser ? '' : 'flip-vertical-bck'}`} >
                <div className='interactContainer'>
                    <Welcome new={newUser} />
                    {newUser ?
                        <RegisterView
                            verifyCredidentials={verifyCredidentials}
                            changeView={changeView}
                            block={block}
                        />
                        :
                        <LoginView
                            verifyCredidentials={verifyCredidentials}
                            changeView={changeView}
                        />}
                </div>
            </div>
            <SplashView />
            <Toast
                toastList={toastList}
                autoDelete={true}
                autoDeleteTime={3000}
            />
        </div>
    )
}
