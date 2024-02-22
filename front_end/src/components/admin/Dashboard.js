import React, { useEffect, useState } from 'react'
import Navbar from '../partials/Navbar'
import SideNav from '../partials/SideNav'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
    const [productData, setProductData] = useState([])
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://grull-task-aprk.vercel.app/api/allData')
            .then((response) => { setProductData(response.data.apidata) })
            .catch((error) => { setMessage(error.response.data.message) })
    }, [])

    function handleDelete(id) {
        console.log(id);
        navigate("/dashboard")
        axios.post(`https://grull-task-aprk.vercel.app/api/delete/${id}`)
            .then((response) => { setMessage(response.data.message) })
            .catch((error) => { setMessage(error.response.data.message) })

    }

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
                        <h2 className='fw-bolder text-center mb-4 pageHeading'>Dashboard</h2>
                        <div className="Dashboard">
                            <h5 className="text-center">{message}</h5>
                            <Link to='/addproduct'><button className="btn btn-outline-info my-3 form-control"><h6 className='m-0'>Add More Product</h6></button></Link>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Update</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productData.length === 0 ? (
                                        <tr>
                                            <th colSpan={9}><h1 className='text-center'>No Products Found</h1></th>
                                        </tr>
                                    ) :
                                        (productData.map((result) => (
                                            <tr key={result._id}>
                                                <td>{result.name}</td>
                                                <td>{result.desc}</td>
                                                <td>{result.category}</td>
                                                <td>{result.price}</td>
                                                <td>{result.img}</td>
                                                <td>{result.qty}</td>
                                                <td>{result.status}</td>
                                                <td><Link to={`/updateProduct/${result._id}`}><button className="btn btn-warning">Update</button></Link></td>

                                                <td><button className='deleteBTN' type='button' onClick={(e) => { handleDelete(result._id) }}><i className="fa-solid fa-trash-can" ></i></button></td>
                                            </tr>
                                        ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard
