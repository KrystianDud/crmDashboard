import axios from 'axios'
import React, { useEffect } from 'react'

import '../../css/globals.css'
import './index.css'

import CompanyCard from '../Components/CompanyCard/CompanyCard'
/**
 * Display the users related to the company which will include
 * 
 *  // Service: 
 *  Company Card - each company in the DB, User Table for selected company, order card - total, order card - to prep, 
 *  Company card {
 *      slug
 *      statOne
 *      statTwo
 *      buttonProps
 *  }
 *  // Client:
 *  orders to be delivered, users table
 * 
 */

import Table from '../Components/Table'

export default function Overview() {

    // temb variables
    const slug = "public/images/company/logoMike Institution1656261172.jpg"
    const statOne = { name: 'users', value: 25 }
    const statTwo = { name: 'sales', value: 9 }
    const buttonProps = {
        text: 'View',
        type: 'contained',
        disabled: false,
        color: 'normal',
        size: 'sm',
        icon: null,
        callback: () => viewCompany(id)
    }

    // Table Columns 
    // Name, email, role, purchases, created
    useEffect(() => {
        // axios.get()

    }, [])

    const viewCompany = (id) => {

    }

    return (
        <div className='viewWindow flexRow'>

            <CompanyCard
                slug={slug}
                statOne={statOne}
                statTwo={statTwo}
                buttonProps={buttonProps}
                // id={}
            />
            {/* <Table 

            /> */}
        </div>
    )
}
