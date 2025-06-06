import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";

function OrderListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders ? orders.slice(indexOfFirstOrder, indexOfLastOrder) : [];


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>All Transactions</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>BUYER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>TAX</th>
                <th>PAID</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.username}</td>
                  <td>
                    {order.createdAt &&
                      new Date(order.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                  </td>
                  <td>$ {order.totalPrice}</td>
                  <td>$ {order.taxPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt ? (
                        new Date(order.paidAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      ) : null
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="dark" className="btn-sm rounded">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            ordersPerPage={ordersPerPage}
            totalOrders={orders.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

export default OrderListScreen;

function Pagination({ ordersPerPage, totalOrders, paginate }) {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
