import React, { useState } from 'react'
import '../../Login/index.css';

import Input from '../Global/Input';

export default function LoginView({ verifyCredidentials, changeView }) {

    const [formDetails, setFormDetails] = useState({
        email: '',
        password: ''
    })

    const updateForms = (e) => {
        setFormDetails({...formDetails, [e.target.type]: e.target.value})
    }

    return (
        <div className='loginForm'>
            <Input
                type={'email'}
                margin={['5px']}
                label={'Email'}
                onChange={(e) => updateForms(e)}
            />
            <Input
                type={'password'}
                margin={['5px']}
                label={'Password'}
                onChange={(e) => updateForms(e)}
            />

            <button className='loginButton' onClick={() => verifyCredidentials(formDetails, 'login')}>Login</button>

            <div className='signupLine'>
                <p>Not a user?<b className='signupText' onClick={() => changeView()}> Signup now!</b></p>
            </div>
        </div>
    )
}
