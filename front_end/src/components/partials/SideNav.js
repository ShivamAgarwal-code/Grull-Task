import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ContextApi from '../../ContextApi'

function SideNav() {
    const { fav, setCategoryData } = useContext(ContextApi)
    const navigate = useNavigate()
    const userName = localStorage.getItem('userName')

    let Username;
    if (fav) {
        Username = fav.userName.userName
    }

    function removeCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    const handleLogOut = (e) => {
        removeCookie('token');
        localStorage.removeItem('userName')
        navigate('/')
    }

    const handleCategory = (value) => {
        axios.post('https://grull-task-aprk.vercel.app/api/category', { category: value })
            .then((response) => { setCategoryData(response.data.apidata) })
            .catch((error) => { console.log(error.response.data.message) })
    }

    let totalFavItems
    let total;
    if (JSON.parse(localStorage.getItem('fav'))) {
        totalFavItems = JSON.parse(localStorage.getItem('fav'))
        total = totalFavItems.totalFavItems
    }

    return (
        <div className="col-md-2 PageList">
            <h5>Pages</h5>
            {userName === "Admin" ? (
                <div className="dashboard py-2">
                    <Link to={'/dashboard'} className='text-decoration-none text-dark'>
                        <span className='fs-5'><i className="fa-solid fa-gauge-high px-2"></i>Dashboard</span>
                    </Link>
                </div>
            ) : (<></>)}
            <div className="products py-2">
                <Link to={'/products'} className='text-decoration-none text-dark'>
                    <span className='fs-5'><i className="fa-solid fa-box px-2"></i>Products</span>
                </Link>
            </div>
            {Username && Username === userName ? (
                <div className="favourites py-2">
                    <Link to={'/favourites'} className='text-decoration-none text-dark'>
                        <span className='fs-5'><i className="fa-regular fa-heart px-2"></i>Favourites {total}</span>
                    </Link>
                </div>
            ) : (
                <div className="favourites py-2" style={{ opacity: 0.5, pointerEvents: 'none' }}>
                    <Link to={'/favourites'} className='text-decoration-none text-dark'>
                        <span className='fs-5'><i className="fa-regular fa-heart px-2"></i>Favourites</span>
                    </Link>
                </div>
            )}
            <div className="orderList py-2">
                <Link to={'/orderList'} className='text-decoration-none text-dark'>
                    <span className='fs-5'><i className="fa-solid fa-list-check px-2"></i>Order List</span>
                </Link>
            </div>

            <hr />
            <h5>Category</h5>
            <div className='category'>
                <div className="All Products">
                    <button onClick={() => { handleCategory('all') }}>All Products</button>
                </div>
                <div className="Shoes">
                    <button onClick={() => { handleCategory('Shoes') }}>Shoes</button>
                </div>
                <div className="Bagpack">
                    <button onClick={() => { handleCategory('Bagpack') }}>Bagpack</button>
                </div>
                <div className="Electronics">
                    <button onClick={() => { handleCategory('Electronics') }}>Electronics</button>
                </div>
                <div className="T-Shirt">
                    <button onClick={() => { handleCategory('T-Shirt') }}>T-Shirt</button>
                </div>
                <div className="Furniture">
                    <button onClick={() => { handleCategory('Furniture') }}>Furniture</button>
                </div>
            </div>
            <hr />

            <div className="logOut py-2">
                <button onClick={(e) => { handleLogOut(e) }}>
                    <span className='fs-5'><i className="fa-solid fa-arrow-right-from-bracket px-2"></i>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default SideNav
