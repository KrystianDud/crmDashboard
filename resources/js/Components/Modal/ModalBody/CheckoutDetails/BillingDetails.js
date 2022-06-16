import React from 'react'
import './index.css'

import Button from '../../../Button/index';
import Input from '../../../Global/Input'
import CardComponent from './CardComponent';

export default function BillingDetails({company}) {
    const bcg = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '1rem'
    }
    const inputStyle = {
        width: '90%'
    }
    const inputLabel = {
        fontSize: '0.7rem',
        fontWeight: 600
    }
    return (
        <div>
            <h3>Billing Details</h3>
            <div className="billing-payment">
                <CardComponent company={company}/>
                <Button
                    text={'Use Other'}
                    type={'outlineNormal'}
                    disabled={false}
                    color={''}
                    size={'sm'}
                    icon={null}
                    callback={() => console.log('this button is disabled')}
                />
            </div>
            <div className="billing-shipping">
                <h3>Shipping Details</h3>
                <Input
                    id={'line_one'}
                    type={'text'}
                    margin={['5px']}
                    label={'First Line of the address'}
                    onChange={(e) => onChange(e)}
                    style={bcg}
                    styleLabel={inputLabel}
                    styleInput={inputStyle}
                />

                <Input
                    id={'line_one'}
                    type={'text'}
                    margin={['5px']}
                    label={'Second Line of the address'}
                    onChange={(e) => onChange(e)}
                    style={bcg}
                    styleLabel={inputLabel}
                    styleInput={inputStyle}
                />

                <Input
                    id={'line_one'}
                    type={'text'}
                    margin={['5px']}
                    label={'City'}
                    onChange={(e) => onChange(e)}
                    style={bcg}
                    styleLabel={inputLabel}
                    styleInput={inputStyle}
                />

                <Input
                    id={'line_one'}
                    type={'text'}
                    margin={['5px']}
                    label={'Postcode'}
                    onChange={(e) => onChange(e)}
                    style={bcg}
                    styleLabel={inputLabel}
                    styleInput={inputStyle}
                />
            </div>
        </div>
    )
}
