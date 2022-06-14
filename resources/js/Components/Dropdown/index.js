import React, { forwardRef } from 'react'
import './index.css'
import '../../../css/globals.css'
import IncrementButton from '../Button/IncrementButton';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'lodash';
/**
 * {type} : a type of list options: [simple(name only), cart(image, name, )]
 */

const Dropdown = forwardRef(({ type, position, open, list, caller }, ref) => {

    const selectType = () => {
        if (typeof type == 'undefined') return

        else if (type == 'simple') {
            return list.map(({ id, name }) => (
                <div key={id} className='flexColumn'>
                    <div className='dropdown-content' onClick={() => caller(id)}>{name}</div>
                    <div className="line80"></div>
                </div>
            ))
        }

        else if (type == 'cart') {
            if(list.length > 0){
                console.log(list)
                return list.map(({ id, name, price, slug, quantity }) => (
                <div key={id} className='flexRow dropdown-content' onClick={() => caller(id)}>
                    <div className="content-image w100" />
                    <div className="flexRow">
                        <div className='flexColumn alignCenter flexOne alignStart w100 mInline5 cartTitle'>
                            <div >{name}</div>
                            <div className="line100 "></div>
                            <div className='cartPrice'>{`£${price}`}</div>
                        </div>
                        <div className="flexColumn alignCenter m15">
                            <IncrementButton />
                            <div className='flexRow'>
                                <span>X</span>
                                <span>{quantity}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        }
        else return
    }

    return (
        <div
            ref={ref}
            className={`dropdown smooth-shadow absolute`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                visibility: `${open ? 'visible' : 'hidden'}`
            }}
        >
            <div className='dropdown-container'>
                {selectType()}
            </div>
        </div>
    )

})

export default Dropdown;