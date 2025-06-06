import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, listProducts } from "../actions/productActions";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!userInfo.isAdmin) {
        navigate("/Unauthorized");
      } else {
        dispatch(listProducts());
      }
    }
  }, [dispatch, navigate, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="text-center">
        <br />
        <h3>Product List</h3>
        <Form>
          <Row>
            <Col md={3} />
            <Col md={6}>
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search"
                className="me-1"
                aria-label="Search"
              />
            </Col>
          </Row>
        </Form>
        <br />
        <Link to="/AddProduct" className="btn btn-primary bg-dark rounded">
          Add Artwork
        </Link>
      </div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Owner</th>
            <th>Artwork</th>
            <th>Picture</th>
            <th>Price</th>
            <th>Seller Email</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <tbody>
            {products
              .filter((product) => {
                return (
                  (search.toLowerCase() === "" ||
                  product.name.toLowerCase().includes(search) ||
                  product.description.toLowerCase().includes(search) ||
                  product.user.toLowerCase().includes(search) ||
                  product.price.toLowerCase().includes(search)) 
                );
              })
              .map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.seller}</td>
                    <td>{product.name}</td>
                    <td>
                      <img
                        className="rounded"
                        src={product.image}
                        width="100"
                        height="100"
                        alt={product.name}
                      />
                    </td>
                    <td>{product.price}</td>
                    <td>{product.selleremail}</td>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="d-grid gap-1">
                        <Button
                          variant="danger"
                          className="btn-md rounded-pill"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                        <LinkContainer to={`/EditProduct/${product._id}`}>
                          <Button variant="light" className="btn-sm rounded-pill">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </Table>
    </div>
  );
};
export default ProductListScreen
