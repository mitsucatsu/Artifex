import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_LOGIN_REQUEST,

    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,

    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_EDIT_FAIL,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,


}
    from '../constants/userConstants'
import axios from 'axios'

import {
    ORDER_LIST_MY_RESET
} from '../constants/orderConstants'



export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('http://127.0.0.1:8000/account/login/',

            { 'email': email, 'password': password }, config


        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))



    }

    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }

}


export const register = (username, email, password, paypalemail) => async (dispatch) => {
    try {

        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('http://127.0.0.1:8000/account/register/',


            { 'username': username, 'email': email, 'password': password, 'paypalemail': paypalemail }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }
    catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }
}


export const logout = () => (dispatch) => {

    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
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

        const { data } = await axios.get(`http://127.0.0.1:8000/account/users/${id}/`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};



export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `http://127.0.0.1:8000/account/users/`,
            config
        )

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.put("http://127.0.0.1:8000/account/profile/update/", user, config);

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        const updatedUserInfo = {
            ...userInfo,
            ...data,
        };

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: updatedUserInfo,
        });

        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const editUser = (requestData) => async (dispatch, getState) => {
    console.log('requestData -> ', requestData)
    const { id } = requestData
    try {
        dispatch({
            type: USER_EDIT_REQUEST,
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

        const { data } = await axios.put(`http://127.0.0.1:8000/account/users/edit/${id}/`, requestData, config);

        dispatch({
            type: USER_EDIT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }

};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
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

        const { data } = await axios.delete(`http://127.0.0.1:8000/account/users/delete/${id}/`, config);


        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }

};
