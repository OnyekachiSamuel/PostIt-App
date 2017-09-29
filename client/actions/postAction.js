import axios from 'axios';
import { POST_MESSAGE_SUCCESSFUL, POST_MESSAGE_FAILURE } from './actionTypes';


export const postedMessage = (payload) => {
  return {
    type: POST_MESSAGE_SUCCESSFUL,
    payload
  };
};

export const postedMessageFailure = (payload) => {
  return {
    type: POST_MESSAGE_FAILURE,
    payload
  };
};

export const postRequest = (messageContent, groupId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/group/${groupId}/messages`, messageContent).then((response) => {
      if (response.status === 200) {
        const { post } = response.data;
        dispatch(postedMessage(post));
      }
    }).catch((error) => {
      dispatch(postedMessageFailure(error.response.data.errors.message));
      Materialize.toast(error.response.data.errors.message, 2500, 'red white-text rounded');
    });
  };
};
