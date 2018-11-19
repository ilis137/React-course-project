import * as actionTypes from "../actions/actions";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };
  const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
  };
  const purchaseBurgerSuccess = (state, action) => {
    return updateObject(state, {
      loading: false,
      purchased: true,
      orders: state.orders.concat(newOrder)
    });
  };
  const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, { loading: false });
  };

  const purchaseBurgerStart = state => {
    return updateObject(state, { loading: false });
  };

  const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
      loading: false,
      orders: action.orders
    });
  };
  const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false });
  };

  const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true });
  };

  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    default:
      return state;
  }
};
export default reducer;
