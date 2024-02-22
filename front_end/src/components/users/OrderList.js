import React, { useEffect, useState } from 'react'
import SideNav from '../partials/SideNav'
import Navbar from '../partials/Navbar'
import { motion } from 'framer-motion'
import axios from 'axios'

function OrderList() {
    const [myOrders, setMyOrders] = useState([])
    const userName = localStorage.getItem('userName')

    useEffect(() => {
        axios.get(`https://grull-task-aprk.vercel.app/api/myOrders/${userName}`)
            .then((response) => { setMyOrders(response.data.apiData); })
            .catch((error) => { console.log(error); })
    }, [userName])

    return (
        <div>
            <header id='header'>
                <Navbar />
            </header>
            <section id='body'>
                <div className="row w-100 m-0">

                    <SideNav />

                    <motion.div
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        exit={{
                            opacity: 0
                        }}
                        transition={{
                            duration: 0.45,
                            ease: 'easeOut'
                        }} className="col-md-10 MainPage">

                        <h2 className='fw-bolder text-center mb-4 pageHeading'>Order List</h2>
                        <div className="OrderList">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Product Name</th>
                                        <th>Product Image</th>
                                        <th>Product Quatity</th>
                                        <th>Purchased Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myOrders.map((result, num) => (
                                        <tr key={result._id}>
                                            <td>{num + 1}</td>
                                            <td>{result.name}</td>
                                            <td><img style={{ height: '100px' }} src={result.img} alt="" /></td>
                                            <td>{result.qty}</td>
                                            <td>{result.pDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default OrderList
