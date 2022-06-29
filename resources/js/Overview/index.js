import axios from 'axios'
import React, { useEffect } from 'react'

/**
 * Display the users related to the company which will include
 * 
 *  // Service: 
 *  Company Card - each company in the DB, User Table for selected company, order card - total, order card - to prep, 
 * 
 *  // Client:
 *  orders to be delivered, users table
 * 
 */

import Table from '../Components/Table'

export default function Overview() {

    // Table Columns 
    // Name, email, role, purchases, created
    useEffect(() => {
        axios.get()
        
    }, [])
    
    return (
        <div>
            <Table 

            />
        </div>
    )
}
