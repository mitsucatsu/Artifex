import React, { useEffect } from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useLocation, useNavigate, Link } from 'react-router-dom';

function LoginScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className="d-flex justify-content-center align-items-center ">
            <Form onSubmit={handleSubmit} autoComplete="off" style={{ maxWidth: "400px", width: "100%" }}>
                <h1 className="text-center mb-3">Sign In</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                    <Form.Control className="rounded mb-3" required type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%" }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="rounded mb-3" type="password" placeholder="Input Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%" }} />
                </Form.Group>
                <Button className="rounded bg-dark" variant="primary" type="submit" onChange={handleSubmit} style={{ width: "100%" }}>
                    Log In
                </Button>
                <Row className='py-3'>
                    <Col className="text-center">
                        Sign up? <br/><Link to={'/Register'}> Register</Link>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default LoginScreen