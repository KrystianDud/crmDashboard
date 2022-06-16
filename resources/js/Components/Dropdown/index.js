import React, { forwardRef, useEffect, useState } from 'react'
import './index.css'
import '../../../css/globals.css'
import IncrementButton from '../Button/IncrementButton';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { isEmpty, uniqueId } from 'lodash';
import Button from '../Button';
/**
 * {type} : a type of list options: [simple(name only), cart(image, name, )]
 */

const Dropdown = forwardRef(({ type, position, open, list, caller, callback, startModal }, ref) => {
    const [lastClicked, setLastClicked] = useState(null)
    const [updatedList, setUpdatedList] = useState()
    useEffect(() => {
        console.log('dropdown effect')
        setUpdatedList(list)
    }, [])

    useEffect(() => {
        setUpdatedList(list)
    }, [list])


    const updateCart = (ref, func) => {
        // get id from the ref param and grab the item from the list prop to pass in on to the callback function.
        console.log('calling from dropdown', func)
        let clickedItem = list.filter(item => item.id == ref)[0]
        setLastClicked(list)
        callback(clickedItem, func)
    } 

    const simple = (
        list.map(({ id, name }) => (
            <div key={id} className='flexColumn'>
                <div className='dropdown-content' onClick={() => caller(id)}>{name} </div>
                <div className="line80"></div>
            </div>
        ))
    )

    const cart = (
        <div>
            {list.length > 0 && type == 'cart' ? list.map(({ id, name, price, slug, quantity }) => (
                <div key={id + '.' + uniqueId()} className='flexRow dropdown-content' onClick={(e) => caller(e, id)}>
                    <div className="content-image w100" style={{ backgroundImage: `url(${slug.slice(6)})`, }} />
                    <div className="flexRow">
                        <div className='flexColumn alignCenter flexOne alignStart w100 mInline5 cartTitle'>
                            <div >{name}</div>
                            <div className="line100 "></div>
                            <div className='cartPrice'>{`£${price}`}</div>
                        </div>
                        <div className="flexColumn alignCenter m15">
                            <IncrementButton onClick={updateCart} refItem={id} />
                            <div className='flexRow'>
                                <span>X</span>
                                <span>{quantity}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )) : null}
            {list.length > 0 ? <Button
                text={'Checkout'}
                type={'contained'}
                disabled={false}
                color={'normal'}
                size={'sm'}
                icon={null}
                callback={() => startModal()}
            /> : null}
        </div>
    )

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
                {/* {selectType()} */}
                {type == 'simple' ? simple : null}
                {type == 'cart' ? cart : null}

            </div>
        </div>
    )

})

export default Dropdown;