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

    const verifyCredidentials = (data, type) => {
        let newData = data; 

        if (newData.email === '' || !newData.email.includes('@')) {
            setToastList([...toastList, newToast('Email structure is not correct', 'Warning')])
            return
        } 

        if (newData.type) {
            newData.type = 'client';
        }
        else{
            newData.type = 'service';
        }
        console.log('changing the type', newData)

        axios({
            method: 'POST',
            url: `api/${type}`,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(newData)
        })
            .then((response) => {
                console.log(response)
                if (response.status == 200) {
                    let user = response.data.user;
                    let userData = {
                        id: user.id,
                        email: user.email,
                        name: user.name
                    }
                    if (typeof user.type != 'undefined' || user.type != '') {
                        const type = user.type
                        Object.assign(userData, type)
                    }
                    console.log(userData)
                    processUser(userData)
                }
                else if (response.status == 201) {
                    setToastList([...toastList, newToast('New account has been created', 'Success')])
                    setNewUser(false)
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
