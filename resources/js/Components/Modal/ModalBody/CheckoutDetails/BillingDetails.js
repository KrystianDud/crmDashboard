import React, { useEffect, useState } from 'react'
import './index.css'

import Button from '../../../Button/index';
import Input from '../../../Global/Input'
import CardComponent from './CardComponent';

export default function BillingDetails({ company, onChange, getPaymentDetails }) {
    const [first, setfirst] = useState({

    });

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

    // pretended card number. change it later in a more sophisticated type of banking payment system
    useEffect(() => {
        const card_number = 1234567891011121 
        getPaymentDetails(card_number)
    }, [])

    return (
        <div>
            <h3>Billing Details</h3>
            <div className="billing-payment">
                <CardComponent company={company} />
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
                    id={'shipping_first_line'}
                    type={'text'}
                    margin={['5px']}
                    label={'First Line of the address'}
                    onChange={(e) => onChange(e)}
                    style={bcg}
                    styleLabel={inputLabel}
                    styleInput={inputStyle}
                />

                <Input
                    id={'shipping_second_line'}
                    type={'text'}
                    margin={['5px']}
                    label={'Second Line of the address'}
                    onChange={(e) => onChange(e)}
                    style={bcg}
                    styleLabel={inputLabel}
                    styleInput={inputStyle}
                />

                <Input
                    id={'shipping_city'}
                    type={'text'}
                    margin={['5px']}
                    label={'City'}
                    onChange={(e) => onChange(e)}
                    style={bcg}
                    styleLabel={inputLabel}
                    styleInput={inputStyle}
                />

                <Input
                    id={'shipping_postcode'}
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
