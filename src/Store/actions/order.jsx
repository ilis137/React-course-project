import * as actionTypes from "./actions";
import axios from "../../Axios-orders.jsx";
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    error: error
  };
};
export const purchaseBurgerStart = orderData => {
  return dispatch => {
    axios
      .post("/orders.json", orderData)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};
