import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, toggleBidding } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Watermark } from "antd";

function ProductScreen() {
  function handleMouseDown(event) {
    if (event.button === 0) {
      event.preventDefault();
    }
  }
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const  {userInfo}  = userLogin;

  if (!userInfo) {
    navigate("/Login");
  } else {
  }

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const handleRightClick = (event) => {
    event.preventDefault();
  };

  const addToCartHandler = () => {
    navigate(`/Cart/${id}?qty=${qty}`);
    console.log("Adding to Cart", id);
  };

  // const sellNowHandler = () => {
  //     dispatch(sellProduct(id)).then((response) => {
  //         navigate("/");
  //     })
  // }

  const handleToggleBidding = (productId, bidding) => {
    if (product && product._id) {
      dispatch(toggleBidding(productId, bidding));
      window.location.reload();
    } else {
      console.error("Product is null or undefined");
    }
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <main onContextMenu={handleRightClick}>
              <Watermark content={"くたばれ、クソ野郎"} gap={[20, 50]}>
                <Image
                  src={product.image}
                  alt={product.name}
                  onMouseDown={handleMouseDown}
                  fluid
                />
              </Watermark>
            </main>
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>{product.description}</h4>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>$ {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Availability:</Col>
                    <Col>{product.stock > 0 ? "Available" : "Sold"}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Owner:</Col>
                    <Col>{product.seller}</Col>
                  </Row>
                </ListGroup.Item>

                {product.stock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.stock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

<ListGroup.Item>
<Row>
<Button
className="btn-block rounded-pill bg-dark"
onClick={addToCartHandler}
disabled={product.bidding === false }
type="Button"
>
{" "}
Add to Cart
</Button>
</Row>
</ListGroup.Item>
<ListGroup.Item>
<Row>
<Col>
{userInfo && userInfo._id && userInfo.username === product.seller ? (
<center>
<Button
onClick={() =>
handleToggleBidding(product._id, !product.bidding)
}
type="button"
className={
product.bidding
? "btn btn-block bg-dark rounded-pill"
: "bg-dark rounded-pill btn btn-outline-block"
}
disabled={false}
>
{product.bidding
? "Remove from Bidding"
: "Add to Bidding"}
</Button>
</center>
) : (
<Message variant="success">
<center>This artwork is up for sale</center>
</Message>
)}
</Col>
</Row>
</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
