import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    // AFTER CHOSING THE PAYMENT METHOD REDIRECT USER TO PlaceOrder SCREEN
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1   />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3 bg-dark rounded-pill">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
