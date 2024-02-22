import React, { useEffect, useState } from 'react'
import Navbar from '../partials/Navbar'
import SideNav from '../partials/SideNav'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Updateproduct() {
    const { id } = useParams()

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [qty, setQty] = useState('')
    const [status, setStatus] = useState('')
    const [img, setImg] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        axios.get(`https://grull-task-aprk.vercel.app/api/singleData/${id}`)
            .then((response) => {
                setName(response.data.apiData.name)
                setDesc(response.data.apiData.desc)
                setCategory(response.data.apiData.category)
                setPrice(response.data.apiData.price)
                setQty(response.data.apiData.qty)
                setStatus(response.data.apiData.status)
                setImg(response.data.apiData.img)

            })
            .catch((error) => { setMessage(error.data.message) })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()

        let formValue = new FormData()
        formValue.append('name', name)
        formValue.append('desc', desc)
        formValue.append('category', category)
        formValue.append('price', price)
        formValue.append('qty', qty)
        formValue.append('status', status)
        formValue.append('img', img)

        axios.put(`https://grull-task-aprk.vercel.app/api/updateProducts/${id}`, formValue)
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
                        <h2 className='fw-bolder text-center mb-4 pageHeading'>Update form</h2>

                        <h5 className="text-center">{message}</h5>
                        <form onSubmit={(e) => { handleSubmit(e) }}>

                            <label htmlFor="">Product Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} />

                            <label htmlFor="">Description</label>
                            <textarea rows='6' className="form-control" value={desc} onChange={(e) => { setDesc(e.target.value) }}></textarea>

                            <label htmlFor="">Category</label>
                            <input type="text" className="form-control" value={category} onChange={(e) => { setCategory(e.target.value) }} />

                            <label htmlFor="">Price</label>
                            <input type="number" className="form-control" value={price} onChange={(e) => { setPrice(e.target.value) }} />

                            <label htmlFor="">Quantity</label>
                            <input type="number" className="form-control" value={qty} onChange={(e) => { setQty(e.target.value) }} />

                            <label htmlFor="">Status</label>
                            <select value={status} onChange={(e) => { setStatus(e.target.value) }} className="form-select">
                                <option value="OUT-OF-STOCK">OUT-OF-STOCK</option>
                                <option value="IN-STOCK">IN-STOCK</option>
                            </select>

                            <label htmlFor="">Image</label>
                            <input type="file" className="form-control" onChange={(e) => { setImg(e.target.files[0]) }} />

                            <button className="btn btn-warning form-control my-2">Update Product</button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Updateproduct
