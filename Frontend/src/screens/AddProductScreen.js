import React  from 'react'
import { useDispatch} from 'react-redux';
import { useState} from 'react';
import { useNavigate, Navigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { newProduct } from '../actions/productActions';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useSelector } from 'react-redux';

function AddProductScreen () {
  const getToken = () => {
    return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
  };
  const token = getToken();

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  const [product, setProduct] = useState({ name: '', description: '', price: 0, stock: 0, selleremail: userInfo.paypalemail});
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', image);
    formData.append('stock', product.stock);
    formData.append('selleremail', product.selleremail)
    
    dispatch(newProduct(formData))
      .then((res) => {
        setIsLoading(false); // set loading to false
        navigate('/Profile');
        console.log('Product', newProduct);
      })
      .catch((err) => {
        setIsLoading(false); // set loading to false
        setError(err.message);
        console.log(err);
      });
  };
  
  if (!token) {
    return <Navigate   to="/Login" />;
  }
  
  return (
    <div>
    {isLoading && <Loader />} {/* show Loader component when isLoading is true */}
    {error && <Message variant="danger">{error}</Message>} 
      <Form onSubmit={handleSubmit} autoComplete="off">
        <h1>Add Artwork</h1>
        
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name of Product:</Form.Label>
          <Form.Control type="text" name="name" placeholder="Product Name" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control type="text" name="description" placeholder="Product Description" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image:</Form.Label>
          <Form.Control type="file" placeholder="Upload image" onChange={handleImageChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price:</Form.Label>
          <Form.Control type="number" name="price" placeholder="Enter Price" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicStock">
          <Form.Label>Stock:</Form.Label>
          <Form.Control type="number" name="stock" placeholder="ONLY enter 1 stock per artwork listing" onChange={handleChange}/>
        </Form.Group>
  
        <Button variant="primary" type="submit" onChange={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProductScreen;
