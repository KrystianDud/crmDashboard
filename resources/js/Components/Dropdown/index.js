import React, { forwardRef } from 'react'
import './index.css'
import '../../../css/globals.css'

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
            return list.map(({ id, name, price }) => (
                <div key={id} className='flexRow dropdown-content' onClick={() => caller(id)}>
                    <div className="content-image w100" />
                    <div className='flexColumn alignCenter flexOne alignStart w100 mInline5 cartTitle'>
                        <div >{name}</div>
                        <div className="line100 "></div>
                        <div className='cartPrice'>{`£${price}`}</div>
                    </div>
                </div>
            ))
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