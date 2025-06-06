import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'

function UserListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/Login')
        }

    }, [dispatch, navigate, userInfo])

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(id));
            navigate("/Userlist");
        }
    };

    return (
        <div>
            <h1>User Accounts:</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>USER ID</th>
                                    <th>USERNAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th>PAYPAL EMAIL</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fa-solid fa-x' style={{ color: 'red' }}></i>
                                        )}</td>
                                        <td>{user.paypalemail}</td>
                                        <td>
                                            <LinkContainer to={`/EditUser/${user._id}`}>
                                                <Button variant='light' className='btn-sm rounded-pill'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                type='button'
                                                className='btn btn-sm btn-danger mx-2 rounded-pill'
                                                onClick={() => handleDeleteUser(user._id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UserListScreen