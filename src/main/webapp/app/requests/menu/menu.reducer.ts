import axios from 'axios';

  export const merchantName = (id : any) => async dispatch => {
    const result = await dispatch({
      payload: axios.post('http://localhost:8084/services/merchant/api/public/get/merchantNameAndData?id='+`${id}`)
    });
    return result;
  };
export const merchantDishestype = (id : any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('http://localhost:8084/services/merchant/api/public/post/merchantDishestype?id='+`${id}`)
  });
  return result;
};

  export const ContentType = (id : any) => async dispatch => {
    const result = await dispatch({
      payload: axios.post('http://localhost:8084/services/merchant/api/public/get/merchantNameAndData?id='+`${id}`)
    });
    return result;
  };