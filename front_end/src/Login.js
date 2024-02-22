import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const loginRecord = { email, password }
        axios.post('https://grull-task-aprk.vercel.app/api/login', { loginRecord })
            .then((response) => {
                if (response.data.status === 200) {
                    localStorage.setItem('userName', response.data.apiData)
                    navigate('/products')
                }
            })
            .catch((error) => { setMessage(error.response.data.message) })
    }

    return (
        <div>
            <div className="row w-100 m-0" style={{ height: "37.96rem" }}>
                <div className="col-md-5 login">
                    <div className="logo">
                        <h4>myLOGO</h4>
                    </div>
                    <form className='loginForm' onSubmit={(e) => { handleSubmit(e) }}>
                        <h3 className='mb-5'>Login to your account</h3>

                        <h5 className='text-danger text-center'>{message}</h5>

                        <label htmlFor="">Email Address</label>
                        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} className='form-control mb-3' autoComplete='username' required />

                        <label htmlFor="">Password</label>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className='form-control mb-4' autoComplete='current-password' required />

                        <button type="submit" className='form-control'>LOGIN</button>
                    </form>
                    <hr />
                    <h6 className='text-center'>Don't have Registered account yet?</h6>
                    <hr />
                    <Link to={'/reg'}>
                        <button type="submit" className='form-control btn btn-outline-warning'>Register now</button>
                    </Link>
                </div>
                <div className="col-md-7 image"></div>
            </div>
        </div>
    )
}

export default Login
