import React, { useState, useEffect } from 'react'
import '../../Login/index.css';
import Input from '../Global/Input';

export default function RegisterView({ verifyCredidentials, changeView }) {
    const [formDetails, setFormDetails] = useState({
        email: '',
        password: '',
        // repeat_password: '',
        type: false
    })
    const [showPasswordWarn, setPasswordWarn] = useState(false);

    useEffect(() => {
        if (formDetails.password != formDetails.repeat_password) setPasswordWarn(true);
        else setPasswordWarn(false);
    }, [formDetails.password, formDetails.repeat_password])

    const updateForms = (e) => {
        if (e.target.id == 'type') {
            setFormDetails({ ...formDetails, type: e.target.checked })
        }
        else {
            setFormDetails({ ...formDetails, [e.target.id]: e.target.value })
        }
    }

    return (
        <div>
            <div className='loginForm'>
                <Input
                    id={'name'}
                    type={'text'}
                    margin={['5px']}
                    label={'Name'}
                    onChange={(e) => updateForms(e)}
                />
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
                {/* <Input
                    id={'repeat_password'}
                    type={'password'}
                    margin={['5px']}
                    label={'Repeat Password'}
                    onChange={(e) => updateForms(e)}
                /> */}
                <Input
                    id={'type'}
                    type={'checkbox'}
                    margin={['5px']}
                    label={'I\'m user of business involved in buying the products '}
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
