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


export const takingOrders = (iocId: any, num: any,merchatid: any,name: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/takingOrders?iocId=' + `${iocId}`+'&num=' + `${num}`+'&merchatid=' + `${merchatid}`+'&name=' + `${name}`)
  });
  return result;
};

export const takingOrdersNum = (iocId: any, merchatid: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/takingOrdersNum?iocId=' + `${iocId}`+'&merchatid=' + `${merchatid}`)
  });
  return result;
};

export const merchantOrders2 = (iocId: any, merchatid: any,other: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/merchantOrders2?iocId=' + `${iocId}`+'&merchatid=' + `${merchatid}`+'&other=' + `${other}`)
  });
  return result;
};

export const inAllOrders = (iocId: any, num: any,merchatid: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/inAllOrders?iocId=' + `${iocId}`+'&merchatid=' + `${merchatid}`)
  });
  return result;
};
