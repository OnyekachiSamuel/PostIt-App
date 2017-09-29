import _ from 'lodash';
import { SENT_MESSAGE } from '../actions/actionTypes';

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case SENT_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
};
export default notificationReducer;
