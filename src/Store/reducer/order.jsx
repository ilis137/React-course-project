import * as actionTypes from "../actions/actions";

const initialState = {
  orders: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
export default reducer;
