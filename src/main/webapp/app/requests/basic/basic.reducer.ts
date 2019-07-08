import axios from 'axios';

const apiUrl = 'services/basic/api';

export const createUserByScanning = (userid: any, phone: any, creator: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post(apiUrl + '/public/user/createUserByScanning', { userid, phone, creator })
  });
  return result;
};
