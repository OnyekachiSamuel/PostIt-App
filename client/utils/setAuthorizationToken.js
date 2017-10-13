import axios from 'axios';

/**
 *
 * @param {string} token
 * @return {null}
 * This function handles setting the request header with
 * the user token
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};
export default setAuthorizationToken;
