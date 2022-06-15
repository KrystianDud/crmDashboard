import React, { useState, useEffect } from 'react';
import './index.css'
import { uniqueId } from 'lodash';
import Button from '../Button';
/**
 *  Column should be an object consisting of the id, keyName recognised by the table content and columnNames
 * @param {*} param0 
 * @returns 
 */
export default function Table({ columns, list, editItem, options, user }) {
    const [rows, setRows] = useState(null)

    // on start rearrange the content of the table according to the columns name.
    useEffect(() => {
        arrangeContent(list)
    }, [])


    const arrangeContent = () => {
        let columnKeys = [];
        columns.forEach(item => {
            columnKeys.push(item.keyName)
        })
        let listKeys = Object.keys(list[0]);
        let includeKeys = listKeys.filter(keys => columnKeys.some(column => column == keys));
        let listArray = [];
        list.forEach((item,) => {
            let newItem = {}
            for (let i = 0; i < Object.keys(item).length; i++) {
                for (let j = 0; j < includeKeys.length; j++) {
                    if (Object.keys(item)[i] == includeKeys[j]) {
                        newItem[includeKeys[j]] = item[includeKeys[j]]
                    }
                }
            }
            listArray.push(newItem)
        });
        setRows(listArray)
    };

    const provideOptions = (
        user.type == 'service' ?
            // service
            <td>
                <Button
                    text={'Update'}
                    type={'contained'}
                    disabled={false}
                    color={'normal'}
                    size={'lg'}
                    icon={null}
                    callback={() => editItem(index)}
                />
            </td>
            :
            // client
            <td>
                <Button
                    text={'Buy'}
                    type={'contained'}
                    disabled={false}
                    color={'normal'}
                    size={'lg'}
                    icon={null}
                    callback={() => buyItem(index)}
                />
            </td>
    );

    return (
        <table className='table'>

            <thead>
                <tr className='table-header'>
                    {columns.map((column) => (
                        <th className='border-grey-secondary' key={column.keyName}>{column.name}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {rows != 'undefined' ? rows && rows.map((row, index) => (
                    <tr key={uniqueId()} className='w table-row border-grey-secondary table-row-thin' >

                        {row != 'undefined' ? Object.keys(row).map((rowData) => (
                            <td key={uniqueId()} className='table-element'>
                                {row[rowData] == 'price' ? `£${row[rowData]}` : row[rowData]}
                            </td>
                        )) : 'loading'}

                        {/* add mandatory controller to edit or to buy the product */}
                        {options ? provideOptions : null}
                    </tr>
                )) : null}
            </tbody>
        </table>
    )
};