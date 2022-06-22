import React, { useRef, useState } from 'react';
import './index.css';
import '../../../css/globals.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

export default function FileUpload({ width, height, text, multiple, format, showToast, callback }) {
    const [drag, setDrag] = useState(false)
    const FileUpload = useRef(null)

    const FILE_WEIGHT_LIMIT = 1024 //kb binary

    const FILE_SIZE_IN_BYTES = 1024 * 1024
    // add file format validation
    // add file size validation (event provides files in bytes) allow for up to 1mb default to upload but later make it as a prop
    // add multiple validation
    // throw toast if error but do it outside of this component to reach the toast context

    // note that user might be deailng with multiple files when the prop 'multiple' is set to true 
    const dropToUpload = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.dataTransfer.files

        let files = e.dataTransfer.files
        // console.log(files)

        // check if file has multiple when
        if (!multiple && files.length > 1) {
            showToast('Multiple files are not allowed!', 'warning')
            return
        }

        // check size of each of uploaded files
        let lastBiggest
        if (files.length > 1) {
            files.forEach((file, index) => {

                if (index == 0) {
                    // save size 
                    lastBiggest = file.size;
                }
                else {
                    if (lastBiggest < file.size) {
                        lastBiggest = file.size
                    }
                }
                if ((e.dataTransfer.files.length - 1) == index) return lastBiggest
            })
        }
        else {
            lastBiggest = files[0].size;
        }

        if (FILE_SIZE_IN_BYTES < lastBiggest) {
            console.log(FILE_SIZE_IN_BYTES, lastBiggest)

            // throw error due to size 
            showToast('File size is too big!', 'warning')
            return
        }
        else {
            // check format and carry on.

            if (files.length > 1) {
                files.forEach((file) => {
                    let findFormat = file.name.split('.')[1]
                    if (!format.includes(findFormat)) {
                        showToast('File format not allowed!', 'warning')
                        return
                    }
                    else {
                        console.log('complete upload')
                        callback(files, 'prod_pic')
                    }
                })
            }
            else {
                let findFormat = files[0].name.split('.')[1]
                if (!format.includes(findFormat)) {
                    showToast('File format not allowed!', 'warning')
                    return
                }
                else {
                    console.log('complete upload')
                    callback(files[0], 'prod_pic')
                }
            }


        }

    }

    const clickToUpload = (e) => {
        e.preventDefault()
        e.stopPropagation()
        FileUpload.current.click()
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        // e.stopPropagation()
        setDrag(true)

    }
    const handleDragEnter = (e) => {
        e.preventDefault()
        // e.stopPropagation()
        setDrag(true)
    }
    const handleDragLeave = (e) => {
        e.preventDefault()
        // e.stopPropagation()
        setDrag(false)
    }

    return (
        <div
            className={`uploadOutline flexColumn alignCenter justifyCenter ${drag && 'uploadOutlineHover'} `}
            style={{ height: height, width: width }}

            onDrop={(e) => dropToUpload(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            onDragOver={(e) => handleDragOver(e)}
            onMouseLeave={() => setDrag(false)}
            onClick={(e) => clickToUpload(e)}
        >
            <p>{text}</p>
            <FontAwesomeIcon size='xl' icon={faUpload} />
            <input ref={FileUpload} multiple={multiple} draggable className='inputHidden' type='file' />
        </div>
    )
}
