import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

function UpdateProfileScreen() {

    const [password, setpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const userDetails = useSelector((state) => state.userDetails);
    const { user, loading, error } = userDetails;
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    const [username, setUserName] = useState(userInfo.username);
    const [email, setEmail] = useState(userInfo.email);
    
    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
        }
    }, [dispatch, user, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
      
        if (password !== confirmPassword) {
          setMessage("Passwords do not match");
        } else {
          dispatch(
            updateUserProfile({
              username: username,
              email: email,
              password: password,
            })
          );
          setMessage("Profile updated successfully");
        }
      };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                {message && <Message variant="success">{message}</Message>}
                {/* {error && <Message variant="danger">{error}</Message>} */}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="name"
                            placeholder="Enter Name"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="passwordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="mt-3">
                        Update
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}

export default UpdateProfileScreen;
