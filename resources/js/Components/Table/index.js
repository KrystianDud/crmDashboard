import React, { useState, useEffect } from 'react';
import './index.css'
import { uniqueId } from 'lodash';
import Button from '../Button';
/**
 *  Column should be an object consisting of the id, keyName recognised by the table content and columnNames
 * @param {*} param0 
 * @returns 
 */
export default function Table({ columns, list, editItem, options }) {
    const [rows, setRows] = useState(null)

    // on start rearrange the content of the table according to the columns name.
    useEffect(() => {
        arrangeContent()
    }, [])


    const arrangeContent = () => {
        let columnKeys = [];
        columns.forEach(item => {
            columnKeys.push(item.keyName)
        })
        let listKeys = Object.keys(list[0]);
        let excludeKeys = listKeys.filter(list => !columnKeys.some(column => column == list));
        let listArray = [];
        list.forEach((item) => {
            // console.log(item['name'])
            for (let i = 0; i < excludeKeys.length; i++) {
                let parameter = excludeKeys[i]
                // console.log(item[parameter])
                delete item[parameter]
            }
            listArray.push(item)
        });
        setRows(listArray)
    };

    const provideOptions = (
        productTest ?
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
                    text={'Update'}
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
}

const allowTest = true;
const productTest = true;