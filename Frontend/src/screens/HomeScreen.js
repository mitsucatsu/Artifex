import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Col, Row } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';

function HomeScreen() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleRightClick = (event) => {
    event.preventDefault();
  };

  return (
    <main onContextMenu={handleRightClick}>
      <div>
        <h1>Bidding</h1>
        <Form>
          <Row>
            <Col>
              <Form.Control style={{ width: 550 }} onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search"
                className="me-1"
                aria-label="Search"
              /><br/>
            </Col>
          </Row>
        </Form>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            {products.filter((product) => {
              return product.bidding;
            }).length === 0 ? (
              <Message>No products found.</Message>
            ) : (
              <Row>
                {products.filter((product) => {
                  return (search.toLowerCase() === '' || product.name.toLowerCase().includes(search)) && product.bidding;
                }).map((product) => (
                  <Col key={product.id} sm={12} md={9} lg={8} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default HomeScreen;
