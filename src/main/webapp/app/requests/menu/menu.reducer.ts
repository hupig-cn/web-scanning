import axios from 'axios';

export const menu = (userId: any, loc: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/basic/api/incomeDetails/test/loc?userId=' + `${userId}` + '&loc=' + `${loc}`)
  });
  return result;
};

export const merchantName = (id: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/get/merchantNameAndData?id=' + `${id}`)
  });
  return result;
};

export const ContentType = (id: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/get/merchantNameAndData?id=' + `${id}`)
  });
  return result;
};

export const merchantDishestype = (id: any, loc: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/merchantDishestype?id=' + `${id}`+'&iocid=' + `${loc}`)
  });
  return result;
};
