import axios from 'axios';
import { mapIdList } from 'app/shared/util/entity-utils';

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
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/merchantDishestype?id=' + `${id}` + '&iocid=' + `${loc}`)
  });
  return result;
};

// 点餐
export const takingOrders = (iocId: any , num: any , merchatid: any , name: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/takingOrders?iocId=' +
    `${iocId}` + '&num=' + `${num}` + '&merchatid=' + `${merchatid}` + '&name=' + `${name}`)
  });
  return result;
};

// 点餐
export const takingOrders2 = (mid: any, ioc: any, userid: any, sum: any, merchantCode: any, chishi: any[]) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/takingOrders2', { mid, ioc, userid, sum, merchantCode, chishi })
  });
  return result;
};

// 点餐
export const takingOrders3 = (mid: any, ioc: any, chishi: any[]) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/takingOrders2', { mid, ioc, chishi })
  });
  return result;
};


// xx
export const createCaiOrder = (userid:any , order: any) => async dispatch => {
    const result = await dispatch({
      payload: axios.post('http://localhost:8084/services/merchant/api/public/post/createCaiOrder?userid=' +`${userid}` + '&order=' + `${order}`)
    });
    return result;
  };

// 重置
export const takingOrdersNum = (iocId: any, merchatid: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/takingOrdersNum?iocId=' + `${iocId}` + '&merchatid=' + `${merchatid}`)
  });
  return result;
};
// 详情
export const merchantOrders2 = (iocId: any, merchatid: any, other: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/merchantOrders2?iocId=' + `${iocId}` + '&merchatid=' + `${merchatid}` + '&other=' + `${other}`)
  });
  return result;
};
// 总价
export const inAllOrders = (iocId: any, merchatid: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/inAllOrders?iocId=' + `${iocId}` + '&merchatid=' + `${merchatid}`)
  });
  return result;
};
