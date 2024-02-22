import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ContextApi from '../../ContextApi'

function Navbar() {
    const { cart } = useContext(ContextApi)
    const userName = localStorage.getItem('userName')

    let Username;
    if (cart) {
        Username = cart.userName.userName
    }

    return (
        <nav className='row w-100 d-flex'>
            <div className="col-md-12 navbar justify-content-around">
                <div className="logo">
                    <h3>myLOGO</h3>
                </div>
                <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder='This Search Is Not Active...' className='form-label' />
                    <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <div className='user'>
                    <div>
                        <h4 className='px-2'><i className="fa-regular fa-user search"></i> {userName}</h4>
                    </div>

                    {Username && userName === Username ? (
                        <Link to={'/cart'} className='fs-5'><i className="fa-solid fa-cart-shopping"> Cart {cart.totalItems}</i></Link>
                    ) : (
                        <Link to={'/cart'} className='fs-5' style={{ opacity: 0.5, pointerEvents: 'none' }}><i className="fa-solid fa-cart-shopping"> Cart</i></Link>
                    )}
                </div>

            </div>

        </nav>
    )
}

export default Navbar
