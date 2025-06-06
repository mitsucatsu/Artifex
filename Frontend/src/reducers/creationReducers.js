import { 
  CREATION_LIST_REQUEST, 
  CREATION_LIST_SUCCESS, 
  CREATION_LIST_FAIL,
  CREATION_DETAILS_REQUEST,
  CREATION_DETAILS_SUCCESS,
  CREATION_DETAILS_FAIL,

  
} from '../constants/creationConstants';

const initialState = {
  loading: false,
  error: null,
  creations: [],
  creation: {},
}

export const creationListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATION_LIST_REQUEST:
      return { ...state, loading: true };
    case CREATION_LIST_SUCCESS:
      return { loading: false, creations: action.payload, error: null };
    case CREATION_LIST_FAIL:
      return { loading: false, creations: [], error: action.payload };
    default:
      return state;
  }
};

export const creationDetailsReducer = (state = { creation: {} }, action) => {
  switch (action.type) {
    case CREATION_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CREATION_DETAILS_SUCCESS:
      return { loading: false, creation: action.payload, error: null };
    case CREATION_DETAILS_FAIL:
      return { loading: false, creation: {}, error: action.payload };
    default:
      return state;
  }
};