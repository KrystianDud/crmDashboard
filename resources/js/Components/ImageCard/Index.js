import React from 'react'
import './index.css';
import '../../../css/globals.css'

import Button from '../Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'


export default function ImageCard({ onClick, itemRef, selectedCard, id, user, img }) {

    const style = {
        backgroundImage: `url(${itemRef.slug.slice(6)})`,
    }
    return (
        <div className={`cardBody ${selectedCard == id ? 'selectedCard' : ''}`} >
            <div className='imageBody' style={style}></div>
            <div className='flexColumn flexBetween'>
                <div className='textBody'>
                    <div className='headingBody' >
                        <h3>{itemRef.name}</h3>
                    </div>
                    <div className='subtitleBody'>
                        {itemRef.description}
                    </div>
                </div>
                <div className='bottomSection'>
                    <div className='priceBody'>
                        <p>£ {itemRef.price}</p>
                    </div>

                    <Button
                        text={user.type == 'service' ? 'Edit' : 'Buy'}
                        type={'contained'}
                        disabled={false}
                        color={'normal'}
                        size={'sm'}
                        icon={null}
                        callback={
                        user.type == 'service' ?
                        () => onClick(id) 
                        :
                        () => onClick(itemRef, 'add')
                        }
                    />
                </div>
            </div>

        </div>

    )
}
