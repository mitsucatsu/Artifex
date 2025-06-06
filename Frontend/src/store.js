import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { productListReducers, productDetailsReducers } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducers, userRegisterReducers } from './reducers/userReducers';

// Combine all reducers
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  // creationList: creationListReducers,
  // creationDetails: creationDetailsReducers
});

// Get cart items from local storage or empty array
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// Get user info from local storage or null
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Initial state
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

// Middleware array
const middleware = [thunk];

// Enable Redux DevTools Extension or fallback to Redux compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
