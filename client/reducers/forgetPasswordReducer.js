import { RESET_LINK_SUCCESS, RESET_LINK_FAILURE, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE } from '../actions/actionTypes';

const initialState = {
  message: '',
  error: ''
};
const forgetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_LINK_SUCCESS:
      return Object.assign({}, {}, { message: action.payload });
    case RESET_LINK_FAILURE:
      return Object.assign({}, {}, { error: action.payload });
    case PASSWORD_RESET_SUCCESS:
      return Object.assign({}, {}, { message: action.payload });
    case PASSWORD_RESET_FAILURE:
      return Object.assign({}, {}, { error: action.payload });
    default:
      return state;
  }
};

export default forgetPasswordReducer;
