import * as actionTypes from "../actions/actions";
import { updateObject } from "../utility";
const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authRedirectPath: "/"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        loading: false,
        token: action.token,
        userId: action.userId,
        error: null
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, {
        loading: false,
        token: null,
        userId: null,
        error: action.error
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        token: null,
        userId: null
      });
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return updateObject(state, {
        authRedirectPath: action.path
      });
    default:
      return state;
  }
};
export default reducer;
