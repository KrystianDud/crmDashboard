import React, { useEffect, useRef, useState } from 'react';

import Input from '../../../Global/Input';
import '../../../../../css/globals.css'

import FileUpload from '../../../FileUpload';

export default function UserDetails({userData, showToast, setComputedData }) {
    const [writeData, setWriteData] = useState({
        method_field: 'put',
        name: userData.name,
        surname: ''
    })

    const canvasRef = useRef(null)

    useEffect(() => {
        if (userData && writeData.name.length < 1) setWriteData(userData.name)

        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 50, 50);

        // create a board consisting of blocks placed randomly on the X and Y axis
        for (let i = 0; i < 100; i += 10) {
            for (let j = 0; j < 100; j += 10) {
                ctx.fillRect(0 + i, 0 + j, 10, 10);
                ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`
            }
        }

        ctx.fillStyle = "white";
        if (writeData.name.length > 0 && writeData.surname.length > 0) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = "black";

            const name = writeData.name.charAt(0)
            const surname = writeData.surname.charAt(0)
            const initials = name + surname
            ctx.font = "20px poppins";
            ctx.fillText(initials.toUpperCase(), 10, 32);
        }

        const formData = new FormData()

        for (const [key, value] of Object.entries(writeData)) {
            if (typeof value == 'string') {
                formData.append(key, value)
            } else {
                formData.append(key, value, 'avatar.jpeg')
            }
        }
        setComputedData(formData)

        if (!writeData.avatar) {
            canvasRef.current.toBlob((blob) => {
                setWriteData(prevState => ({
                    ...prevState, avatar: blob
                }))
            }, 'image/jpeg', 0.95)
        }
    }, [writeData.name, writeData.surname, writeData.position])

    const onChange = (e) => {
        const { id, value, files } = e.target;
        if (e.target.type === 'blob') {
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

    const getFile = (file, name) => {

    }

    return (
        <div className='w80 mA flexColumn justifyCenter alignCenter h100 alignStretch'>

            <h3>Complete your user profile. You can upload our own avatar which will replace the one below but it is optional.</h3>
            <Input
                id={'name'}
                type={'text'}
                margin={['5px']}
                label={'Enter tour name'}
                onChange={(e) => onChange(e)}
                value={writeData.name}
            />
            <Input
                id={'surname'}
                type={'text'}
                margin={['5px']}
                label={'Enter your surname'}
                onChange={(e) => onChange(e)}
            />
            <Input
                id={'position'}
                type={'text'}
                margin={['5px']}
                label={'Enter your position within the organisation'}
                onChange={(e) => onChange(e)}
            />

            <div className="mA">
                <p className='textAC'>Upload Your avatar using jpg or png file formats</p>
                <FileUpload
                    width='160px'
                    height='100px'
                    text='Drag and drop product image here:'
                    multiple={false}
                    format={'jpg png'}
                    showToast={showToast}
                    callback={() => getFile()}
                />
                <div className='w100'>
                    <div className='wFT mA'>
                        <canvas ref={canvasRef}
                            id="canvas"
                            height="50"
                            width="50"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}