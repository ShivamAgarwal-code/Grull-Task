import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Reg() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const regRecord = { username, email, password }
    axios.post('https://grull-task-aprk.vercel.app/api/reg', { regRecord })
      .then((response) => {
        if (response.data.status === 201) {
          navigate('/')
        }
      })
      .catch((error) => { setMessage(error.response.data.message) })
  }

  return (
    <div>
      <div className="row w-100 m-0" style={{ height: "37.96rem" }}>
        <div className="col-md-5 reg">
          <div className="logo">
            <h4>myLOGO</h4>
          </div>
          <form className='regForm' onSubmit={handleSubmit}>
            <h3 className='mb-5'>Register your account</h3>

            <h5 className='text-danger text-center'>{message}</h5>

            <label htmlFor="">Full Name</label>
            <input type="text" className='form-control mb-3' value={username} onChange={(e) => { setUsername(e.target.value) }} autoComplete='username' required />

            <label htmlFor="">Email Address</label>
            <input type="email" className='form-control mb-3' value={email} onChange={(e) => { setEmail(e.target.value) }} autoComplete='email' required />

            <label htmlFor="">Password</label>
            <input type="password" className='form-control mb-4' value={password} onChange={(e) => { setPassword(e.target.value) }} autoComplete='current-password' required />

            <button type="submit" className='form-control'>Register now</button>
          </form>
          <hr />
          <h6 className='text-center'>Already have an account?</h6>
          <hr />
          <Link to={'/'}>
            <button type="submit" className='form-control btn btn-outline-warning'>LOGIN</button>
          </Link>
        </div>
        <div className="col-md-7 image"></div>
      </div>
    </div>
  )
}

export default Reg
