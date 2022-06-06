import React from 'react'
import '../../Login/index.css';
export default function Welcome(props) {
    return (
        <div className='welcomeElement'>
            <h3>{props.new ? 'Login' : 'Registration'}</h3>
            <h3>{props.new ? 'Welcome Back!' : 'Welcome!'}</h3>
            <p>{props.new ? 'Non est ad astra mollis e terris via' : 'Ut haec ipsa qui non sentiat deorum vim habere is nihil omnino sensurus esse videatur'}</p>
        </div>
    )
}
