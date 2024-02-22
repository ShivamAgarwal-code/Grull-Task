import React, { useState } from 'react'
import Navbar from '../partials/Navbar'
import SideNav from '../partials/SideNav'
import { motion } from 'framer-motion'
import axios from 'axios'

function Addproduct() {
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const formValues = new FormData()
        formValues.append('productName', productName)
        formValues.append('description', description)
        formValues.append('category', category)
        formValues.append('price', price)
        formValues.append('quantity', quantity)
        formValues.append('image', image)

        axios.post('https://grull-task-aprk.vercel.app/api/addData', formValues)
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

                    <div className="col-md-10 MainPage">
                        <h2 className='fw-bolder text-center mb-4 pageHeading'>Add Products</h2>
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
                            }} className="Addproducts">
                            <h5 className="text-center">{message}</h5>
                            <form onSubmit={(e) => handleSubmit(e)}>

                                <label htmlFor="">Product Name</label>
                                <input type="text" className="form-control" value={productName} onChange={(e) => { setProductName(e.target.value) }} required />

                                <label htmlFor="">Description</label>
                                <textarea rows='6' className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }} required></textarea>

                                <label htmlFor="">Category</label>
                                <input type="text" className="form-control" value={category} onChange={(e) => { setCategory(e.target.value) }} required />

                                <label htmlFor="">Price</label>
                                <input type="number" className="form-control" value={price} onChange={(e) => { setPrice(e.target.value) }} required />

                                <label htmlFor="">Quantity</label>
                                <input type="number" className="form-control" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} required />

                                <label htmlFor="">Image</label>
                                <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} className="form-control" />

                                <button className="btn btn-success form-control my-2">Add Product</button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Addproduct
