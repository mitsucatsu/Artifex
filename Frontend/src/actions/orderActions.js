import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    PAY_ORDER_REQUEST,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_REQUEST,

}
from '../constants/orderConstants';

import axios from 'axios';

/* ACTION CREATOR USED IN CREATING ORDER IN PlaceOrderScreen COMPONENT  */
export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_ORDER_REQUEST,
      });
  
      // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS, WE NEED TO BE LOGGED IN TO PLACE ORDER
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
        },
      };
  
      /* MAKING API CALL TO SAVE THE ORDER DETAILS */
      const { data } = await axios.post(`http://127.0.0.1:8000/api/orders/add`, order, config);
  
      /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data,
      });
  
    //   // REST CART INFO STORED IN STATE & LOCAL STORAGE AFTER ORDER PLACED
    //   dispatch({
    //     type: CART_CLEAR_ITEMS,
    //     payload: data,
    //   });
  
      localStorage.removeItem("cartItems");
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  /* ACTION CREATOR USED IN CREATING ORDER IN PlaceOrderScreen COMPONENT  */
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    /* MAKING API CALL TO GET THE ORDER DETAILS */
    const { data } = await axios.get(`http://127.0.0.1:8000/api/orders/${id}/`, config);

    /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED IN MAKING PAYMENT IN OrderScreen COMPONENT  */
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAY_ORDER_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    /* MAKING API CALL TO SAVE THE PAYMENT DETAILS */
    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/orders/${id}/pay/`,
      paymentResult,
      config
    );

    /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: PAY_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAY_ORDER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    /* MAKING API CALL TO GET THE DETAILS OF THE ORDERS MADE BY THE USER */
    const { data } = await axios.get(`http://127.0.0.1:8000/api/orders/myorders/`, config);

    /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`http://127.0.0.1:8000/api/orders/`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
      dispatch({
          type: ORDER_DELETE_REQUEST,
      });

      const {
          userLogin: { userInfo },
      } = getState();

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.access}`,
          },
      };

      const { data } = await axios.delete(`http://127.0.0.1:8000/api/orders/delete/${id}`, config);


      dispatch({
          type: ORDER_DELETE_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: ORDER_DELETE_FAIL,
          payload:
              error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
      });
  }

};
  