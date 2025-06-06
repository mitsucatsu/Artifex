import React from 'react'
import { useEffect } from 'react'
import { Link, useParams, useLocation, Navigate, useNavigate } from'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch, useSelector } from'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Watermark } from "antd";

function CartScreen() {
  const getToken = () => {
        return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;};
  const token = getToken();
  const {id }= useParams()
  const location = useLocation()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(() => {
    if (id) {
        dispatch(addToCart(id, qty))
    }
}, [dispatch, id, qty])

const handleRightClick = (event) => {
    event.preventDefault();
    }

  const removeFromCartHandler = (id) => {
  dispatch(removeFromCart(id))
}

    const checkoutHandler = () => {
    navigate("/payment");
  };

if (!token) {
    return <Navigate   to="/Login" />;
  }
  return (
    <Row>
            <Col md={8}>
                <h1>Add to Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='warning'>
                        You do not have any items <br />
                        <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                        <main onContextMenu={handleRightClick}>
                                        <Watermark content={"mitsucatsu"} gap={[20,50]}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Watermark>        
                                        </main>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={2}>
                                         $ {item.price}
                                        </Col>

                                        <Col md={3}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                             
                                            >
                                                {

                                                    [...Array(item.stock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>
                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>

                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                             $ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

            <ListGroup.Item>
            <Button
              type="button"
              className="btn btn-info w-100"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>

                </Card>
            </Col>
        </Row>
  )
}

export default CartScreen
