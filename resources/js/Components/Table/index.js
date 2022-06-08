import React, { useState, useEffect } from 'react';
import './index.css'
/**
 *  Column should be an object consisting of the id, keyName recognised by the table content and columnNames
 * @param {*} param0 
 * @returns 
 */
export default function Table({ columns, list, exclude }) {
    const [rows, setRows] = useState(null)

    // on start rearrange the content of the table according to the columns name.
    useEffect(() => {
        arrangeContent()
    }, [])


    const arrangeContent = () => {
        let filterRows = []

        for (let i = 0; i < list.length; i++) {
            if (columns[i].keyName == list[i].name) {
                filterRows.push(list[i])
            }
        }
        setRows(filterRows)
    };

    return (
        <table className='table table-spacer'>

            <thead>
                <tr className='table-header'>
                    {columns.map((column) => (
                        <th >{column}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {rows && rows.map((row, index) => (
                    <tr key={column[index.id]} className='w row' >
                        {row.map((rowData) => (
                            <td key={rowData} className='table-element'>
                                {rowData}
                            </td>
                        ))}

                        {/* add mandatory controller to edit or to buy the product */}
                        {productTest ?
                            // service
                            <td>
                                <button>edit</button>
                            </td>
                            :
                            // client
                            <td>
                                <button>buy</button>
                            </td>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

