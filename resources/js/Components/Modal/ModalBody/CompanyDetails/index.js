import React, { useState, useEffect } from 'react'
import Input from '../../../Global/Input'
import '../../../../../css/globals.css'
export default function CompanyDetails({setComputedData, updateData }) {
    const [writeData, setWriteData] = useState({})

    const bcg = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '1rem'
    }

    const inputStyle = {
        width: '90%'
    }

    const inputWarningStyle = {
        ...inputStyle,
        border: '1px solid #'
    }

    const inputLabel = {
        fontSize: '0.7rem',
        fontWeight: 600
    }

    const uploadStyle = {
        ...inputStyle,
        border: 'none',
        margin: '1rem 0'
    }

    useEffect(() => {
            const formData = new FormData() 

            for (const [key, value] of Object.entries(writeData)) {
                if (typeof value == 'string') {
                    formData.append(key, value)
                } else {
                    formData.append(key, value[0], 'logo.jpg')
                }
            }
            setComputedData(formData)
        
    }, [writeData])


    const onChange = (e) => { 
        const { id, value, files } = e.target; 
        if (e.target.type === 'file') {
            setWriteData(prevState => ({
                ...prevState, [id]: files
            }))
        }
        else {
            setWriteData(prevState => ({
                ...prevState, [id]: value
            }))
        } 
    }

    return (
        <div className='flex flexColumn justifyCenter'>
            <Input
                id={'name'}
                type={'text'}
                margin={['5px']}
                label={'Company name (must be the same that you have registered with'}
                onChange={(e) => onChange(e)}
                style={bcg}
                styleLabel={inputLabel}
                styleInput={inputStyle}
            />
            <Input
                id={'line_1'}
                type={'text'}
                margin={['5px']}
                label={'First Line of Address'}
                onChange={(e) => onChange(e)}
                style={bcg}
                styleLabel={inputLabel}
                styleInput={inputStyle}

            />
            <Input
                id={'line_2'}
                type={'text'}
                margin={['5px']}
                label={'Second Line of Address'}
                onChange={(e) => onChange(e)}
                style={bcg}
                styleLabel={inputLabel}
                styleInput={inputStyle}
            />
            <Input
                id={'city'}
                type={'text'}
                margin={['5px']}
                label={'Name of the city'}
                onChange={(e) => onChange(e)}
                style={bcg}
                styleLabel={inputLabel}
                styleInput={inputStyle}
            />
            <Input
                id={'postcode'}
                type={'text'}
                margin={['5px']}
                label={'Postcode'}
                onChange={(e) => onChange(e)}
                style={bcg}
                styleLabel={inputLabel}
                styleInput={inputStyle}
            />
            <div className='line100 mt mb' />
            <Input
                id={'website'}
                type={'url'}
                margin={['5px']}
                label={'Company Website Address'}
                onChange={(e) => onChange(e)}
                style={bcg}
                styleLabel={inputLabel}
                styleInput={inputStyle}

            />
            <Input
                id={'logo'}
                type={'file'}
                margin={['5px']}
                label={'Upload Logo'}
                onChange={(e) => onChange(e)}
                style={bcg}
                styleLabel={inputLabel}
                styleInput={uploadStyle}

            />
            <Input
                id={'email'}
                type={'email'}
                margin={['5px']}
                label={'Email Address'}
                onChange={(e) => onChange(e)}
                style={bcg}
                styleLabel={inputLabel}
                styleInput={inputStyle}

            />
        </div>
    )
}
