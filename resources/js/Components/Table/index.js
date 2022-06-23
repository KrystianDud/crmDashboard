import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import '../../../css/globals.css'
import { uniqueId } from 'lodash';
import moment from 'moment';

import Button from '../Button';
import Slider from '../../Orders/Slider';

import axios from 'axios';
/**
 *  Column should be an object consisting of the id, keyName recognised by the table content and columnNames
 * @param {*} param0 
 * @returns 
 */
export default function Table({ columns, list, editItem, options, provideOptions, sliderData }) {
    const [transactionProducts, setTransactionproducts] = useState(null);
    const [transactionInvoice, setTransactionInvoice] = useState(null);
    const [sliderId, setSliderId] = useState(0)
    const [viewQueue, setViewQueue] = useState([])

    const tableBodyRef = useRef(null)
    console.log(tableBodyRef)

    // ToDo move this to the order and pass as a prop as this is not integral part of the table component
    const slideDetails = (id) => {
        if (transactionInvoice) {

        }
    }

    // get the data using transaction id - will retrive products specific only for this transaction.
    // Next, will update the state and display the list of thiem inside of the slideDetails variable.
    // Last, will display data as per structure in slideDetails component.
    const insertDetailsContainer = (id) => {
        setSliderId(id);
        // in order to activate the animation efficiently program must know what was the last id of the row becuse
        // only then the animate-out can be triggered. setting this to true on load causes nasty glitch which makes the application unusable!
        let array = viewQueue;
        array.push(id)
        setViewQueue(array)
    };


    return (
        <div className="table">
            <div className="table-head">
                <div className="table-head table-control">
                    {columns.map((column) => (
                        <div className="table-section table-cell border-grey-secondary" key={column}>
                            {column}
                        </div>
                    ))}
                </div>
                <div className="table-body">
                    {list.map((row, index) => (
                        <React.Fragment key={uniqueId()} >
                            <div className={`table-control table-row border-grey-secondary ${sliderId == row.id ? 'table-row-selected' : ''}`}>
                                {Object.keys(row).map((rowData) => (
                                    <div key={uniqueId() + '.' + row.order_date} className='table-cell'>
                                        {row[rowData] == 'price' ? `£${row[rowData]}` : row[rowData]}
                                    </div>
                                ))}

                                {options ?
                                    <div className='table-cell'>
                                        <Button
                                            text={'View'}
                                            type={'contained'}
                                            disabled={false}
                                            color={'normal'}
                                            size={'sm'}
                                            icon={null}
                                            callback={() => insertDetailsContainer(row.id)}
                                        />
                                    </div> : null}
                            </div>

                            <Slider
                                sliderData={sliderData}
                                id={row.id}
                                activeId={sliderId}
                                array={viewQueue}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </div>

        </div >
    )
};