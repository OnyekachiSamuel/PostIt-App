import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { FETCH_USERS_SUCCESS } from './actionTypes';

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched when a user searches
 * other users to be added to a group
 */
export const fetchUsers = (payload) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload
  };
};

/**
 *
 * @param {obj} userSearch
 * @return {promise} Makes axios call on search for users
 * and dispatches a fetUsers action on successful search action
 */
export const fetchUsersRequest = (userSearch) => {
  return (dispatch) => {
    return axios.get(`/api/v1/users?offset=${userSearch.offset}&search=${userSearch.search}&limit=${userSearch.limit}`)
    .then((response) => {
      const { searchMetaData, paginatedUsers } = response.data;
      let data;
      if (!isEmpty(searchMetaData) && paginatedUsers.length > 0) {
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
