import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../partials/Navbar'
import SideNav from '../partials/SideNav'
import { motion } from 'framer-motion'
import axios from 'axios'
import ContextApi from '../../ContextApi'

function Details() {
    const { cart, setCart } = useContext(ContextApi)
    const userName = localStorage.getItem('userName')
    const { id } = useParams()
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`https://grull-task-aprk.vercel.app/api/singleData/${id}`)
            .then((response) => { setData(response.data.apiData) })
            .catch((error) => { console.log(error) })
    }, [id])

    function handlecart(e, id) {
        let _cart = { ...cart }
        if (!_cart.userName) {
            _cart.userName = {}
        }
        if (!_cart.userName[userName]) {
            _cart.userName = { userName }
        }
        if (!_cart.items) {
            _cart.items = {}
        }
        if (!_cart.items[id]) {
            _cart.items[id] = 1
        } else {
            _cart.items[id] += 1
        }
        if (!_cart.totalItems) {
            _cart.totalItems = 1
        } else {
            _cart.totalItems += 1
        }
        setCart(_cart)
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

                        <div className="details">
                            {data ? (
                                <>
                                    <img src={`../${data.img}`} style={{ height: '250px', margin: "20px" }} alt="" />
                                    <div className="detail">
                                        <h2>{data.name}</h2>
                                        <p>{data.desc}</p>
                                        <p className='d-flex fs-5'><span className='fs-5'>Price:&nbsp;</span>{data.price}</p>
                                        <p className='d-flex fs-5'><span className='fs-5'>Status:&nbsp;</span>{data.status}</p>

                                        <button className="btn btn-outline-success mx-2" onClick={(e) => { handlecart(e, data._id) }}>Add to Cart</button>
                                    </div>
                                </>
                            ) : (
                                <div className='gifSetting'>
                                    <img src="https://icons8.com/preloaders/preloaders/1493/Settings.gif" alt="Animation" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Details
