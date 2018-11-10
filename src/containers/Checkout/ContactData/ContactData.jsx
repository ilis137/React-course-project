import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../Axios-orders.jsx";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
  state = {
    OrderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name"
        },
        value: ""
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street"
        },
        value: ""
      },
      ZIPCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIPCode"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your E-mail"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "fastest" },
            { value: "cheapest", displayValue: "cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };
  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let el in this.state.OrderForm) {
      formData[el] = this.state.OrderForm[el].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  inputChangeHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.OrderForm
    };
    const updatedOrderFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedOrderFormElement.value = e.target.value;
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
    this.setState({
      OrderForm: updatedOrderForm
    });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.OrderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.OrderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={e => {
              this.inputChangeHandler(e, formElement.id);
            }}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );

    if (this.state.loading) form = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact info:</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
