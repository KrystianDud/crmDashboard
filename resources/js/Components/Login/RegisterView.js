import React, { useState, useEffect } from 'react'
import '../../Login/index.css';
import Input from '../Global/Input';

export default function RegisterView({ verifyCredidentials, changeView }) {
    const [formDetails, setFormDetails] = useState({
        email: '',
        password: '',
        repeat_password: '',
        birth_date: null
    })
    const [showPasswordWarn, setPasswordWarn] = useState(false);

    useEffect(() => {
        if ((formDetails.password != formDetails.repeat_password) && formDetails.password.length > 0) setPasswordWarn(true);
        else setPasswordWarn(false);
    }, [formDetails.password])

    const updateForms = (e) => {
        setFormDetails({ ...formDetails, [e.target.type]: e.target.value })
    }


    return (
        <div>
            <div className='loginForm'>

                <Input
                    id={'email'}
                    type={'email'}
                    margin={['5px']}
                    label={'Email'}
                    onChange={(e) => updateForms(e)}
                />
                <Input
                    id={'password'}
                    type={'password'}
                    margin={['5px']}
                    label={'Password'}
                    onChange={(e) => updateForms(e)}
                />
                {/* repeat password */}
                <Input
                    id={'repeat_password'}
                    type={'password'}
                    margin={['5px']}
                    label={'Password'}
                    onChange={(e) => updateForms(e)}
                />
                {showPasswordWarn ? <p style={{ color: 'red' }}> The passwords do not match</p> : null}

                <button className='loginButton' onClick={() => verifyCredidentials(formDetails, 'register')}>Register</button>

                <div className='signupLine'>
                    <p>Already a user?<b className='signupText' onClick={() => changeView()}> Login now!</b></p>
                </div>

            </div>
        </div>
    )
}
