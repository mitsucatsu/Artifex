import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, userUpdateProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
import axios from "axios";
import Product from "../components/Product";

function ProfileScreen() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // const [products, setProducts] = useState([]);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/Login");
    } else {
      if (!user || !user.username || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setUserName(user.username);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user, success]);


  return (
    <Row>
      <Col md={5}>
        <h2>User Profile:</h2>
        <ul class="list-group">
          <li class="list-group-item">Username: {userInfo.username}</li>
          <li class="list-group-item">Email: {userInfo.email}</li>
          <strong></strong>
        </ul>
      </Col>

      <Col md={5}>
        <Link to="/UpdateProfile" className="btn btn-light my-3">
          Update Profile
        </Link>
      </Col>

      <Col md={9}>
        <h2>My Purchases</h2>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : orders.length === 0 ? (
          <Message variant="info">You have no purchases.</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.createdAt ? order.createdAt.substring(0, 10) : null}
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt ? (
                        order.paidAt.substring(0, 10)
                      ) : null
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm rounded-pill bg-dark">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
      <Row>

      </Row>
      <Col>
        <h1>My Products</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {products
              .filter((product) => {
                return product.seller === userInfo.username;
              })
              .map((product) => (
                <Col key={product.id} sm={12} md={9} lg={8} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
