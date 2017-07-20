import axios from 'axios';

export function userSignupRequest(userData) {
  return (dispatch) => {
    axios.post('http://localhost:3000/api/signup', userData).then((user) => {
      console.log(user.data.message);
    }).catch((error) => {
      throw error;
    });
  };
}
