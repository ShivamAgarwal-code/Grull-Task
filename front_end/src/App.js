import React, { useEffect, useState } from 'react'
import ContextApi from './ContextApi'
import { BrowserRouter as Router } from 'react-router-dom'
import AnimatedRoutes from './components/AnimatedRoutes'

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
  const [fav, setFav] = useState(JSON.parse(localStorage.getItem('fav')))
  const [categoryData, setCategoryData] = useState();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('fav', JSON.stringify(fav))
  }, [cart, fav])

  return (
    <Router>
      <ContextApi.Provider value={{ fav, setFav, categoryData, setCategoryData, cart, setCart }}>
        <AnimatedRoutes />
      </ContextApi.Provider>
    </Router>
  )
}

export default App
