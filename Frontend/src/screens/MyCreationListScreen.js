import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCreations, getCreationDetails } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';




function MyCreationListScreen({ history }) {
  const dispatch = useDispatch();
  const creationList = useSelector((state) => state.creationList);
  const { error, loading, creations } = creationList ;


  //   useEffect(() => {
//     let mount = true
//     getProduct()
//     .then(res => {console.log("res from api", res)
//         setProducts(res)
//         return() => mount = false
//     })
// }, [])


  useEffect(() => {
    dispatch(listCreations());
  }, [dispatch]);

  return (
    <div>
      <h2>My Creation List</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {creations.map((creation) => (
                <tr key={creation._id}>
                  <td>{creation._id}</td>
                  <td>{creation.name}</td>
                  <td>${creation.price}</td>
                  <td>{creation.category}</td>
                  <td>
                    <Link to={`/admin/creation/${creation._id}/edit`}>
                      <button className='btn btn-sm'>
                        <i className='fas fa-edit'></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button className='btn btn-sm'>
                      <i className='fas fa-trash'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyCreationListScreen;