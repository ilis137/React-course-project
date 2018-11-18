import * as actionType from "./actions";
import axios from "../../Axios-orders.jsx";
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFailed = error => {
  return {
    type: actionType.PURCHASE_BURGER_FAILED,
    error: error
  };
};
export const purchaseBurgerStart = () => {
  return {
    type: actionType.PURCHASE_BURGER_START
  };
};
export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());

    axios
      .post("/orders.json", orderData)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};
export const purchaseInit = () => {
  return {
    type: actionType.PURCHASE_INIT
  };
};
export const fetchOrdersSuccess = orders => {
  return {
    type: actionType.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};
export const fetchOrdersFail = error => {
  return {
    type: actionType.FETCH_ORDERS_FAIL,
    error
  };
};
export const fetchOrdersStart = () => {
  return {
    type: actionType.FETCH_ORDERS_START
  };
};
export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json")
      .then(res => {
        const fetchOrders = [];
        console.log(res.data);
        for (let key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchOrders));
      })
      .catch(res => {
        dispatch(fetchOrdersFail(res));
      });
  };
};
