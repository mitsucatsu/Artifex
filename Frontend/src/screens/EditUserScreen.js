import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserDetails, editUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

function EditUserScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  // const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || user._id !== _id) {
        dispatch(getUserDetails(_id));
      } else {
        setUsername(user.name);
        setEmail(user.email)
      }
    }
  }, [_id, navigate, userInfo, dispatch]);

  const submitHandler = (e) => {
    console.log(e)
    console.log({ id: _id, username: user.username, email: user.email })
    e.preventDefault();
    console.log('email -> ', email)
    console.log('username -> ', username)
    dispatch(editUser({ id: _id, username, email }));
    navigate('/userlist');
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <div>
      <h2>Edit User</h2>

      <Form onSubmit={submitHandler}>


        <Form.Group controlId='name'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='username' placeholder='Enter Username' autoComplete='off' value={username} onChange={(e) => setUsername(e.target.value)} required></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address </Form.Label>
          <Form.Control required type='email' placeholder='Enter Email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        {/* <Form.Group controlId="isAdmin">
          <Form.Check
            type="checkbox"
            label="Is Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Form.Group> */}


        <Button className='mt-3' type='submit' variant='success'>Update User</Button>

      </Form>
    </div>
  );
}

export default EditUserScreen;