import React from 'react'
import '../../../css/globals.css'
import './index.css'
/**
 * 
 * @param {*} total 
 * @param {*} transactions
 * @param {*} sold
 * @param {*} inventory 
 * @returns 
 */
export default function OverviewDisplay({ total, transactions, sold, inventory }) {
    return (
        <div className='background-white  m20 p5 overviewDisplay'>

            <div className="flexRow flexAround">
                <div className="flexColumn">
                    <div className=" font-body1">
                        <p>Total sales</p>
                    </div>
                    <div className="flexRow flexAround">
                        <p className='font-caption '>July</p>
                        <p className='font-body1'>£140 098</p>
                    </div>
                </div>

                <div className="flexColumn">
                    <div className=" font-body1">
                        <p>Total sales</p>
                    </div>
                    <div className="flexRow flexAround">
                        <p className='font-caption '>June</p>
                        <p className='font-body1'>£140 098</p>
                    </div>
                </div>

                <div className="flexColumn">
                    <div className=" font-body1">
                        <p>Total Transactions</p>
                    </div>
                    <div className="flexRow flexAround">
                        <p className='font-caption '>April</p>
                        <p className='font-body1'>£140 098</p>
                    </div>
                </div>

                <div className="flexColumn">
                    <div className=" font-body1 ">
                        <p>Total products sold</p>
                    </div> 

                    <div className="flexRow flexAround">
                        <p className='font-caption '>March</p>
                        <p className='font-body1'>£140 098</p>
                    </div>
                </div>

                <div className="flexColumn">
                    <div className=" font-body1">
                        <p>Quick inventory</p>
                    </div>
                </div>

            </div>


        </div>
    )
}
