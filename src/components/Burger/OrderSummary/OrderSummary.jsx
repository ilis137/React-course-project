import React from "react";
import Button from "../../UI/Button/Button";
const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li>
        <span style={{ textTransform: "capitalize" }}>{igKey}:</span>
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <>
      <div>Your Order</div>
      <p>A delicious burger with following ingredients!</p>
      <ul>{ingredientSummary}</ul>
      <p>
        Total Price:
        {props.price.toFixed(2)}
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        Continue
      </Button>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
    </>
  );
};
export default OrderSummary;
