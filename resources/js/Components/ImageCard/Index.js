import React from 'react'
import './index.css';
import '../../../css/globals.css'

import Button from '../Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'


export default function ImageCard({ onClick, img, heading, subtitle, price, edit, showSidebar, selectedCard, id, deleteProduct }) {
    return (
        <div className={`cardBody ${selectedCard == id ? 'selectedCard' : ''}`} >
            <div className='imageBody'></div>


            <div className='flexColumn flexBetween'>
                <div className='textBody'>
                    <div className='headingBody' >
                        <h3>{heading}</h3>
                    </div>
                    <div className='subtitleBody'>
                        {subtitle}
                    </div>
                </div>
                <div className='bottomSection'>
                    <div className='priceBody'>
                        <p>{price}</p>
                    </div>
                    <Button
                        text={'Edit'}
                        type={'contained'}
                        disabled={false}
                        color={'normal'}
                        size={'sm'}
                        icon={null}
                        callback={() => onClick(id)}
                    />
                </div>
            </div>

        </div>

    )
}
