import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../components/withErrorHandler/withErrorHandler";
import axios from "../../Axios-orders.jsx";
import { connect } from "react-redux";
import * as actionTypes from "../../Store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.8,
  meat: 1.4
};
class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };
  addIngrdientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = newCount;
    const price = INGREDIENT_PRICES[type];
    console.log(INGREDIENT_PRICES);
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + price;
    console.log(newPrice);
    console.log(updatedIngredient);
    this.setState({
      ingredients: updatedIngredient,
      totalPrice: newPrice
    });
    console.log(this.state);
    this.updatePurchasable(updatedIngredient);
  };
  removeIngrdientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const newCount = oldCount - 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = newCount;
    const price = INGREDIENT_PRICES[type];
    console.log(INGREDIENT_PRICES);
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - price;
    console.log(newPrice);
    console.log(updatedIngredient);
    this.setState({
      ingredients: updatedIngredient,
      totalPrice: newPrice
    });
    console.log(this.state);
    this.updatePurchasable(updatedIngredient);
  };

  updatePurchasable = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  handlePurchase = () => {
    this.setState({ purchasing: true });
  };
  handlePurchaseCanceled = () => {
    this.setState({
      purchasing: false
    });
  };
  handleContinue = () => {
    //alert("purchase continue");

    this.props.history.push("/checkout");
  };
  componentDidMount() {
    axios
      .get("https://burger-builder-1c167.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }
  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p>ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BurgerControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchasable(this.props.ings)}
            purchase={this.handlePurchase}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.handlePurchaseCanceled}
          purchaseContinued={this.handleContinue}
          price={this.props.price}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.handlePurchaseCanceled}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName }),
    onIngredientRemoved: ingName =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingName
      })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
