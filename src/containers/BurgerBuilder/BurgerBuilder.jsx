import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../components/withErrorHandler/withErrorHandler";
import axios from "../../Axios-orders.jsx";

import Spinner from "../../components/UI/Spinner/Spinner";
const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.8,
  meat: 1.4
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 5,
    purchasable: false,
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
    this.setState({ purchasable: sum > 0 });
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
    /* this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "max",
        address: "agshdjj",
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => this.setState({ loading: false, purchasing: false }));*/
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
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
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p>ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls
            ingredientAdded={this.addIngrdientHandler}
            ingredientRemoved={this.removeIngrdientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchase={this.handlePurchase}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.handlePurchaseCanceled}
          purchaseContinued={this.handleContinue}
          price={this.state.totalPrice}
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
export default withErrorHandler(BurgerBuilder, axios);
