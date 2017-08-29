import axios from 'axios';
import { ARCHIVE_MESSAGE_SUCCESS } from './actionTypes';

export const archiveMessage = (payload) => {
  return {
    type: ARCHIVE_MESSAGE_SUCCESS,
    payload
  };
};


export const archiveMessageRequest = (groupId) => {
  return (dispatch) => {
    return axios.put(`/api/v1/group/archive/messages/${groupId}`).then((response) => {
      if (response.status === 200) {
        dispatch(archiveMessage({ data: [], groupCreator: true }));
        Materialize.toast('Message(s) successfully archived', 2000, 'green white-text rounded');
      }
    });
  };
};
