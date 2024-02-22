import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../partials/Navbar'
import SideNav from '../partials/SideNav'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ContextApi from '../../ContextApi'

function Products() {
    const { categoryData, cart, setCart, fav, setFav } = useContext(ContextApi)
    const userName = localStorage.getItem('userName')
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState('')
    const [select] = useState('');
    const [currentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(9)

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = postPerPage - lastPostIndex
    const currontPost = products.slice(firstPostIndex, lastPostIndex)

    function handleLoadMore() {
        if (postPerPage < products.length) {
            setPostPerPage(postPerPage + 9)
        }
    }

    useEffect(() => {
        axios.get('https://grull-task-aprk.vercel.app/api/produstInStock')
            .then((response) => {
                if (categoryData === undefined) {
                    setProducts(response.data.apiData)
                } else {
                    setProducts(categoryData)
                }
            })
            .catch((error) => { setMessage(error.response.data.message) })
    }, [categoryData])

    const handleSort = (value) => {
        axios.post('https://grull-task-aprk.vercel.app/api/sortingList', { value })
            .then((response) => { setProducts(response.data.apidata) })
            .catch((error) => { console.log(error) })
    }

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


    function handleAddFav(e, id) {
        let _fav = { ...fav }
        if (!_fav.userName) {
            _fav.userName = {}
        }
        if (!_fav.userName[userName]) {
            _fav.userName = { userName }
        }
        if (!_fav.favItems) {
            _fav.favItems = {}
        }
        if (!_fav.favItems[id]) {
            _fav.favItems[id] = 1
        } else {
            _fav.favItems[id] += 1
        }
        if (!_fav.totalFavItems) {
            _fav.totalFavItems = 1
        } else {
            _fav.totalFavItems += 1
        }
        setFav(_fav)
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

                        <h2 className='fw-bolder text-center mb-4 pageHeading'>Products</h2>
                        <h5 className="text-center">{message}</h5>
                        <h5 className="text-center">{select}</h5>
                        <div className="select w-25">
                            <select value={select} onChange={(e) => { handleSort(e.target.value) }} className="form-select" aria-label="Default select example">
                                <option defaultValue>Sort by price/alphabets</option>
                                <option value="High to low">High to low price</option>
                                <option value="Low to high">Low to high price</option>
                                <option value="Accending">Accending Order</option>
                                <option value="Descending">Descending order</option>
                            </select>
                        </div>
                        <div className="product">

                            {currontPost.map((data) => (
                                <motion.div
                                    whileHover="hover"
                                    variants={{
                                        hover: {
                                            scale: 1.03,
                                            boxShadow: "0 10px 10px #00000082"
                                        },
                                    }}
                                    transition={{
                                        duration: 0.45,
                                        ease: "backInOut"
                                    }} key={data._id} className="card" style={{ width: '18rem' }}>
                                    <img src={data.img} style={{ height: '20rem' }} className="card-img-top" alt="..." />
                                    <button onClick={(e) => { handleAddFav(e, data._id) }} className='addFavBtn'>
                                        <h1>+</h1>
                                    </button>
                                    <div className="card-body">
                                        <h5 className="card-title">{data.name}</h5>
                                        <h6 className="card-text">{data.price} Rs.</h6>
                                        <button className="btn btn-outline-success mx-2" onClick={(e) => { handlecart(e, data._id) }}>Add to Cart</button>

                                        <Link to={`/details/${data._id}`}>
                                            <button className="btn btn-outline-info ">More Details</button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-center p-3">
                            {postPerPage >= products.length ? (<></>) : (
                                <button className='StyleBTN' onClick={handleLoadMore}>Load More...</button>
                            )}
                        </div>
                    </motion.div>


                </div>
            </section>
        </div>
    )
}

export default Products
