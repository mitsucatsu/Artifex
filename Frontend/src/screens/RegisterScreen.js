import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { register } from '../actions/userActions';

function RegisterScreen() {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [paypalemail, setPaypalemail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const location = useLocation()
  const navigate = useNavigate()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userRegister = useSelector(state => state.userRegister)
  const { error, loading, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])


  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not Match')
    }
    else {
      dispatch(register(username, email, password, paypalemail))

    }

  }
  return (
    <div className='d-flex justify-content-center'>
      <div className='col-md-3'>
      <h1 className="text-center mb-3">Register</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Username</Form.Label>
            <Form.Control className="rounded" type='username' placeholder='Enter Username' autoComplete='off' value={username} onChange={(e) => setUserName(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address </Form.Label>
            <Form.Control className="rounded" type='email' placeholder='Enter Email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Paypal Email </Form.Label>
            <Form.Control className="rounded" type='email' placeholder='Enter Paypal Email' autoComplete='off' value={paypalemail} onChange={(e) => setPaypalemail(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password </Form.Label>
            <Form.Control className="rounded" type='password' placeholder='Enter Password' autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control className="rounded" type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="termsAndConditions">
          <input type="checkbox"
           id="termsAndConditions"
           required
           label="" 
           feedback="Please check this box if you want to proceed.">
           
           </input>
           {" "}
           <label for="termsAndConditions">
           I read and accept the <Link to="/TermsAndConditions">Terms and Conditions</Link>
           </label>
        </Form.Group>

          <Button className='mt-3 rounded' type='submit' variant='success'>Register</Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Already have an account? <br/><Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>SIGN IN</Link>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default RegisterScreen
