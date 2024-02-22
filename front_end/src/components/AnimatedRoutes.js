import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from '../Login'
import Reg from '../Reg'
import Products from '../components/users/Products'
import Favourites from '../components/users/Favourites'
import Cart from '../components/users/Cart'
import Dashboard from '../components/admin/Dashboard'
import Addproduct from '../components/admin/Addproduct'
import Updateproduct from '../components/admin/Updateproduct'
import Details from './users/Details'
import { AnimatePresence } from 'framer-motion'
import OrderList from './users/OrderList'

function AnimatedRoutes() {
    const location = useLocation()
    return (
        <AnimatePresence initial={false} mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Login />}></Route>
                <Route path='/reg' element={<Reg />}></Route>
                <Route path='/products' element={<Products />}></Route>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/addproduct' element={<Addproduct />}></Route>
                <Route path='/details/:id' element={<Details />}></Route>
                <Route path='/favourites' element={<Favourites />}></Route>
                <Route path='/updateproduct/:id' element={<Updateproduct />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/orderList' element={<OrderList />}></Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
