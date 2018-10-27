import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.8,
  meat: 1.4
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 5,
    purchasable: false
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
  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          ingredientAdded={this.addIngrdientHandler}
          ingredientRemoved={this.removeIngrdientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </>
    );
  }
}
export default BurgerBuilder;
