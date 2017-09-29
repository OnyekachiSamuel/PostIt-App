import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { FETCH_USERS_SUCCESS } from './actionTypes';

export const fetchUsers = (payload) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload
  };
};


export const fetchUsersRequest = (userData) => {
  return (dispatch) => {
    return axios.get(`/api/v1/users?offset=${userData.offset}&search=${userData.search}`).then((response) => {
      const { searchMetaData, paginatedUsers } = response.data;
      let data;
      if (!isEmpty(searchMetaData)) {
        const limit = searchMetaData.limit,
          count = searchMetaData.total_count,
          pageCount = Math.ceil(count / limit);
        data = { pageCount, paginatedUsers };
        dispatch(fetchUsers(data));
      } else {
        dispatch(fetchUsers({ pageCount: '', paginatedUsers: [] }));
      }
    });
  };
};
