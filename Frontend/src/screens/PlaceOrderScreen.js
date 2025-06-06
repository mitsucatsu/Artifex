import React, {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

function PlaceOrderScreen() {
  const cart = useSelector(state => state.cart)


  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  cart.taxPrice = Number((0.10) * cart.itemsPrice).toFixed(2)
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(2)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderCreate = useSelector(state => state.orderCreate)
  const {order, error, success} = orderCreate

  useEffect(() => {
    if(success){
        navigate(`/order/${order._id}`)
    }
    
    if(!cart.paymentMethod){
      navigate('/payment')
    }
  }, [success, navigate])

  const placeOrder = () => {
    dispatch(createOrder({
        orderItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
    }))
  }
  return (
    <div>
      <CheckoutSteps step1 step2 />
      <Row>
        <Col md={8}>

    <ListGroup variant='flush'>     
    <ListGroup.Item>
    <h2>Payment Option:</h2>
    <p>
      <strong>Method: </strong>
      {cart.paymentMethod}
    </p>
      </ListGroup.Item>
    

        <ListGroup.Item>
         <h2>Artwork Items</h2>

         {cart.cartItems.length === 0 ? <Message variant='info'>
          You have no cart items
         </Message> : (
          <ListGroup variant ='flush'>
            {cart.cartItems.map((item, index) => (
              <ListGroup.Item>
                <Row>
                  <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={5}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={4}>
                  $
                  {(item.qty * item.price).toFixed(2)}
                  </Col>
                </Row> 
            </ListGroup.Item>  
            ))}
          </ListGroup>
         )}
         </ListGroup.Item>
         </ListGroup>
         </Col>

         

      <Col md={4}>
            <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>

                  <Col>$ {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>

                  <Col>$ {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>

                  <Col>$ {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100 bg-dark rounded-pill"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Confirm Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        </Row>
    </div>
  );
  }

export default PlaceOrderScreen