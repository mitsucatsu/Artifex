import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, editProduct, listProductDetails } from '../actions/productActions'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

function EditProductScreen() {

    let dispatch = useDispatch()
    let navigate = useNavigate()
    const { id } = useParams();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            if (!userInfo.isAdmin) {
                navigate("/Unauthorized")
            } else {
                dispatch(listProducts())
            }
        }
    }, [])

    const AddProductInfo = async () => {
        let formField = new FormData();

        formField.append("name", name);
        // formField.append("image", image);
        formField.append("price", price);
        formField.append("description", description);
        formField.append("stock", stock);
        formField.append("selleremail", selleremail);

        // if (image !== null) {
        //     formField.append("image", image);
        // }

        console.log('formField -> ', formField)
        console.log('id -> ', id)
        dispatch(editProduct({
            id: parseInt(id),
            ...(name && { name }),
            // ...(image && { image }),
            ...(price && { price: parseInt(price) }),
            ...(description && { description }),
            ...(stock && { stock }),
            ...(selleremail && { selleremail })
        })).then((response) => {
            console.log('response -> ', response)
            navigate("/ProductList");
        });
    };

    const productDetails = useSelector((state) => state.productDetails);
    const { product } = productDetails;

    useEffect(() => {
        if (!product.name || product._id !== Number(id)) {
            dispatch(listProductDetails(id));
        } else {
            setName(product.name);
            setPrice(product.price);
            // setImage(product.image);
            setStock(product.stock);
            setDescription(product.description);
        }
    }, [dispatch]);

    const [name, setName] = useState(product.name);
    // const [image, setImage] = useState(null);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [stock, setStock] = useState(product.stock);
    const [selleremail, setSelleremail] = useState(product.selleremail);

    return (
        <div >
            <Link className="btn btn-light my-3" to="/ProductList">
                Go Back
            </Link>
            <br />
            <div className="d-flex justify-content-center align-items-center" variant="light">
                <h1>Edit Product Info</h1>
            </div>
            <Container>
                <div className="d-flex justify-content-center align-items-center">
                    <Row>
                        <Form>
                            <Col md={20} >
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                {/* <Form.Group className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        id="image"
                                        name="image"
                                        className="form-control"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </Form.Group> */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="price"
                                        name="price"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seller Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="selleremail"
                                        name="selleremail"
                                        className="form-control"
                                        value={selleremail}
                                        onChange={(e) => setSelleremail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        id="stock"
                                        name="stock"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </Form.Group>
                                <Button className="btn btn-primary bg-dark rounded" onClick={AddProductInfo}>
                                    Update Product
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </Container>
        </div >
    )
}

export default EditProductScreen
