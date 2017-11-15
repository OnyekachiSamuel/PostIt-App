import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { FETCH_USERS_SUCCESS } from './actionTypes';

/**
 * Action dispatched when a user searches
 * other users to be added to a group
 * @param {obj} payload
 * @return {obj} Returns object containing array of users payload
 */
export const fetchUsers = (payload) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload
  };
};

/**
 * Makes axios call on search for users
 * and dispatches a fetUsers action on successful search action
 * @param {obj} userSearch
 * @return {promise} Returns a promise
 */
export const fetchUsersRequest = (userSearch) => {
  return (dispatch) => {
    return axios.get(`/api/v1/users?offset=${userSearch.offset}&search=${userSearch.search}&limit=${userSearch.limit}`)
    .then((response) => {
      const { searchMetaData, paginatedUsers } = response.data;
      let result;
      if (!isEmpty(searchMetaData) && paginatedUsers.length > 0) {
        const limit = searchMetaData.limit,
          count = searchMetaData.total_count,
          pageCount = Math.ceil(count / limit);
        result = { pageCount, paginatedUsers };
        dispatch(fetchUsers(result));
      } else {
        dispatch(fetchUsers({ pageCount: '', paginatedUsers: [] }));
      }
    });
  };
};
