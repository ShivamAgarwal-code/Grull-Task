import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../partials/Navbar'
import SideNav from '../partials/SideNav'
import { motion } from 'framer-motion'
import ContextApi from '../../ContextApi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Cart() {
    const navigate = useNavigate()
    const { cart, setCart } = useContext(ContextApi)
    const [message, setMessage] = useState('')
    const [cartData, setCartData] = useState([]);
    const userName = localStorage.getItem('userName')
    const Username = cart.userName.userName

    useEffect(() => {
        if (Username === userName) {
            axios.post('https://grull-task-aprk.vercel.app/api/cart', { ids: Object.keys(cart.items) })
                .then((response) => { setCartData(response.data.apiData) })
                .catch((error) => { setMessage(error.response.data.message) })
        } else {
            <></>
        }
    }, [cart, userName, Username])

    function handleQty(id) {
        return cart.items[id]
    }

    let totalAmount = 0
    function handlePrice(id, price) {
        let totalQty = handleQty(id)
        totalAmount += totalQty * price
        return totalQty * price
    }

    function handleIncr(e, id, qty) {
        let currQty = handleQty(id)
        if (currQty >= qty) {
            alert('You have reached to the max quantity')
            return
        }
        let _cart = { ...cart }
        _cart.items[id] = currQty + 1
        _cart.totalItems += 1
        setCart(_cart)
    }

    function handleDec(e, id) {
        let currQty = handleQty(id)
        if (currQty === 1) {
            return
        }
        let _cart = { ...cart }
        _cart.items[id] = currQty - 1
        _cart.totalItems -= 1
        setCart(_cart)
    }

    function handleDelete(e, id) {
        let currQty = handleQty(id)
        let _cart = { ...cart }
        delete _cart.items[id]
        _cart.totalItems -= currQty
        setCart(_cart)
    }

    const handleCheckOut = (e) => {
        let userName = localStorage.getItem('userName')
        axios.post(`https://grull-task-aprk.vercel.app/api/cartData/${userName}`, cart)
            .then((response) => { setMessage(response.data.message) })
            .catch((error) => { console.log(error.response) })
    }

    setTimeout(() => {
        if (message.length > 0) {
            setMessage('')
            cart.items = ''
            cart.totalItems = ''
            navigate('/products')
        }
    }, 2000);

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
                        {cartData.length !== 0 ? (
                            <>
                                <h2 className='fw-bolder text-center mb-4 pageHeading'>Cart</h2>
                                {message.length > 0 ? (
                                    <div className="alert alert-success" role="alert">
                                        <h5 className="text-center">{message}</h5>
                                    </div>
                                ) : (<></>)}
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Product Name</th>
                                            <th>Product Quantity</th>
                                            <th>Product Price</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartData.map((result, num) => (
                                            <tr key={result._id}>

                                                <td>{num + 1}</td>

                                                <td>{result.name}</td>

                                                <td><button onClick={(e) => { handleDec(e, result._id) }}>-</button>  {handleQty(result._id)}  <button onClick={(e) => { handleIncr(e, result._id, result.qty) }}>+</button></td>

                                                <td>{handlePrice(result._id, result.price)}</td>

                                                <td><button onClick={(e) => { handleDelete(e, result._id) }}>Delete</button></td>

                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={5}>
                                                <h4 className='text-center'>Total Amount: {totalAmount} rs.</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}>
                                                <button onClick={(e) => { handleCheckOut(e) }} className="btn btn-success form-control">CheckOut</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>

                        ) : (
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 emptyImg">

                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Cart
