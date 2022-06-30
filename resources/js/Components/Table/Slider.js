import React, { useLayoutEffect, useState } from 'react'
import '../../../css/globals.css'
import '../Table/index.css'

import Button from '../Button'

export default function Slider({ detailsComponent, array, activeId, ...props}, ) {
    const [active, setActive] = useState(false)

    const propsy = {...props}
    let Component = detailsComponent

    useLayoutEffect(() => {
        // if active index returns array of this item then this is the last item which can get the animation-out css class otherwise ignore
        let activeIndex = array[array.length - 2];
        if (activeIndex != 'undefined' && activeIndex == props.id) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [array])

    return (
        <div className={`${activeId === props.id ? 'table-slider table-slider-animate-in' : 'table-slider-off'}  ${active ? 'table-slider-animate-out' : ''} `}>
            <Component {...propsy} />
        </div>
    )
}