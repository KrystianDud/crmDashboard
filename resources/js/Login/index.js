import React, { useState, useEffect } from 'react'
import './index.css'
import '../../css/index.css'
import Welcome from '../Components/Login/Welcome'
import LoginView from '../Components/Login/LoginView'
import RegisterView from '../Components/Login/RegisterView'
import SplashView from '../Components/Login/SplashView'
import axios from 'axios'

export default function Login() {
    const [newUser, setNewUser] = useState(false)

    // check cookies to see if user has used this service before
    useEffect(() => {


        return () => {

        }
    }, [])

    const verifyCredidentials = (data, type) => {
        console.log(JSON.stringify(data))

        if (data.email === '' || !data.email.includes('@')) return

        axios({
            method: 'POST',
            url: `api/auth/${type}`,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(data)
        })
            .then((response) => {
                console.log(response)
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
        </div>
    )
}
