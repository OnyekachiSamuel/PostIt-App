import axios from 'axios';

/**
 * This function handles setting the request header with
 * the user token
 * @param {string} token
 * @return {obj} Returns authorization header
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};
export default setAuthorizationToken;
