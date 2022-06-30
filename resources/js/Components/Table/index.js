import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import '../../../css/globals.css'
import { uniqueId } from 'lodash';
import Moment from 'react-moment';

import Button from '../Button';
import Slider from './Slider';

import axios from 'axios';
/**
 *  Column should be an object consisting of the id, keyName recognised by the table content and columnNames
 * 
 * @param {array} columns - list of the columns to be included in the table
 * @param {array} list - object list of the rows in the table
 * @param {boolean} showDetails - indicates if table includes the details within the slider 
 * @param {boolean} provideDetails - array with the information regarding the details of the given item
 * @param {boolean} options -  if set to true, adds element to the last column provided that the list of items is -1 shorter than columns
 * @param {boolean} provideOptions - external component used for the options column if the options prop is set to true
 * @returns 
 */
export default function Table({ columns, list, showDetails, provideDetails, options, provideOptions, optionsProps, defaultOptionFunction, optionFunction, sliderData }) {
    const [transactionProducts, setTransactionproducts] = useState(null);
    const [transactionInvoice, setTransactionInvoice] = useState(null);
    const [sliderId, setSliderId] = useState(0)
    const [viewQueue, setViewQueue] = useState([])

    let OptionComponent = provideOptions
    // ToDo move this to the order and pass as a prop as this is not integral part of the table component
    const slideDetails = (id) => {
        if (transactionInvoice) {

        }
    }

    // get the data using transaction id - will retrive products specific only for this transaction.
    // Next, will update the state and display the list of thiem inside of the slideDetails variable.
    // Last, will display data as per structure in slideDetails component.
    const insertDetailsContainer = (id) => {
        console.log(123)
        setSliderId(id);
        // in order to activate the animation efficiently program must know what was the last id of the row becuse
        // only then the animate-out can be triggered. setting this to true on load causes nasty glitch which makes the application unusable!
        let array = viewQueue;
        array.push(id)
        setViewQueue(array)
    };

    const sanitiseDate = (rowKey, rowValue) => {
        if (rowKey == 'order_date') {
            return <Moment format="ddd, hh:mm A" date={rowValue}/>
        }
        else if (rowKey == 'price') {
            return '£' + rowValue
        }
        else {
            return rowValue
        }
    }

    return (
        <div className="table ">
            <div className="table-head borderGreyPrimary table-control font-subtitle2">
                {columns.map((column) => (
                    <div className="table-section table-cell" key={column}>
                        {column}
                    </div>
                ))}
            </div>
            <div className="table-body font-subtitle1 ">
                {list.map((row, index) => (
                    <React.Fragment key={row.id} >
                        <div className={`table-control table-row ${sliderId == row.id ? 'table-row-selected' : ''}`}>
                            {Object.keys(row).map((rowData) => (
                                <div key={uniqueId() + '.' + row.order_date} className='table-cell fw3'>
                                    {/* {row[rowData] == 'price' ? `£${row[rowData]}` : row[rowData]} */}
                                    {sanitiseDate(rowData, row[rowData])}
                                </div>
                            ))}

                            {options ?
                                <div className='table-cell'>
                                    <OptionComponent {...optionsProps} callback={() => insertDetailsContainer(row.id)} />
                                </div>
                                : null
                            }
                        </div>

                        {showDetails ?
                            <Slider
                                data={sliderData}
                                id={row.id}
                                index={index}
                                activeId={sliderId}
                                array={viewQueue}
                                detailsComponent={provideDetails}
                            /> : null
                        }

                    </React.Fragment>
                ))}
            </div>

        </div >
    )
};