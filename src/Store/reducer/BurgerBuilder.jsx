import * as actionTypes from "../actions/actions";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.8,
  meat: 1.4
};
const addIngredients = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  };
  return updateObject(state, updatedState);
};

const removeIngredeints = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  };
  return updateObject(state, updatedSt);
};
const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 5
  });
};
const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredients(state, action);

    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredeints(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default Reducer;
