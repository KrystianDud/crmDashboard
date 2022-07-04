import React from 'react'
import '../../../css/globals.css'
import './index.css'


import Button from '../Button'

export default function CompanyCard({ slug, statOne, statTwo, buttonProps }) {
    return (
        <div className='flexColumn background-white companyCard m15 flexBetween'>
            <div className='w100'>
                <div className="logo-image" style={{ backgroundImage: `url(${slug.slice(6)})` }} />
            </div>

            <div className="flexRow flexBetween">
                <div className="flexColumn mInline5">
                    <p className='font-body2'>{statOne.name}</p>
                    <p className='font-body1'>{statOne.value}</p>
                </div>
                <div className="flexColumn mInline5">
                    <p className='font-body2'>{statTwo.name}</p>
                    <p className='font-body1'>{statTwo.value}</p>
                </div>
                <div className="flexColumn mInline5 justifyEnd">
                    <Button {...buttonProps} />
                </div>
            </div>

        </div>
    )
}
