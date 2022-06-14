import React, { useState, useEffect } from 'react'
import './index.css'
import '../../css/index.css'
import Welcome from '../Components/Login/Welcome'
import LoginView from '../Components/Login/LoginView'
import RegisterView from '../Components/Login/RegisterView'
import SplashView from '../Components/Login/SplashView'
import axios from 'axios';

import Toast, { newToast } from '../Components/Toast/Index'

export default function Login({ processUser }) {
    const [newUser, setNewUser] = useState(true)
    const [toastList, setToastList] = useState([])

    useEffect(() => {
        // Check on load what cookies are in there. 
        // If sign of token then assume that user has visited page before thus will prefer login page.
        if (document.cookie.includes('Bearer')) setNewUser(false)
    }, [])

    const verifyCredidentials = (data, type) => {
        let newData = data;

        if (newData.email === '' || !newData.email.includes('@')) {
            setToastList([...toastList, newToast('Email structure is not correct', 'Warning')])
            return
        }

        if (type) {
            if (newData.type) {
                newData.type = 'client';
            }
            else {
                newData.type = 'service';
            }
        }

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
        if (type == 'registration') {
            registrationHeader = {
                'content-type': 'application/json',
            }
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
                    setToastList([...toastList, newToast('New account has been created', 'Success')])
                    setNewUser(false)
                    localStorage.setItem('token', JSON.stringify(response.data.token))
                }
                else {
                    setToastList([...toastList, newToast('User cannot be verified.', 'Warning')])
                }
            })
            .catch((error) => {
                setToastList([...toastList, newToast('Something went wrong, please try again.', 'Warning')])
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
