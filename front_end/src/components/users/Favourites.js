import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../partials/Navbar'
import SideNav from '../partials/SideNav'
import ContextApi from '../../ContextApi'
import axios from 'axios'

function Favourites() {
    const { fav, setFav } = useContext(ContextApi)
    const userName = localStorage.getItem('userName')
    const [favData, setFavData] = useState([])
    const Username = fav.userName.userName


    useEffect(() => {
        if (Username === userName) {
            axios.post('https://grull-task-aprk.vercel.app/api/cart', { ids: Object.keys(fav.favItems) })
                .then((response) => { setFavData(response.data.apiData) })
                .catch((error) => { console.log(error.response.data.message) })
        } else {
            <></>
        }
    }, [fav, Username, userName])


    function handleDelete(e, id) {
        let currQty = fav.favItems[id]
        let _fav = { ...fav }
        delete _fav.favItems[id]
        _fav.totalFavItems -= currQty
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

                        <h2 className='fw-bolder text-center mb-4 pageHeading'>Favourites</h2>
                        <div className="Favourites">
                            {favData.length > 0 ? favData.map((data) => (
                                <motion.div
                                    whileHover="hover"
                                    variants={{
                                        hover: {
                                            scale: 1.03,
                                        },
                                    }}
                                    transition={{
                                        duration: 0.45,
                                        ease: "backInOut"
                                    }} key={data._id} className="card" style={{ width: '18rem' }}>
                                    <img src={data.img} style={{ height: '18rem' }} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{data.name}</h5>
                                        <h6 className="card-text">{data.price} Rs.</h6>

                                        <Link to={`/details/${data._id}`}>
                                            <button className="btn btn-outline-info">More Details</button>
                                        </Link>

                                        <button onClick={(e) => { handleDelete(e, data._id) }} className='removeBTN'><i className="fa-solid fa-trash-can" ></i></button>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className='d-flex justify-content-center align-items-center text-center text-secondary' style={{ height: "300px", width: '600px' }}>
                                    <h1>You didn't add any product to your favorites section.</h1>
                                </div>
                            )
                            }
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Favourites
