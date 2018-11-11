import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../Axios-orders.jsx";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
  state = {
    OrderForm: {
      //controls:
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name"
        },
        value: "",
        validation: {
          Required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street"
        },
        value: "",
        validation: {
          Required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      ZIPCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIPCode"
        },
        value: "",
        validation: {
          Required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "country"
        },
        value: "",
        validation: {
          Required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your E-mail"
        },
        value: "",
        validation: {
          Required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "fastest" },
            { value: "cheapest", displayValue: "cheapest" }
          ]
        },
        validation: {},
        value: "",
        valid: true
      }
    },
    formIsValid: false,
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

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  inputChangeHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.OrderForm
    };
    const updatedOrderFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedOrderFormElement.value = e.target.value;
    updatedOrderFormElement.valid = this.checkValidity(
      updatedOrderFormElement.value,
      updatedOrderFormElement.validation
    );
    updatedOrderFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;

    let formIsValid = true;
    for (let inputIdentifiers in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
    }
    this.setState({
      OrderForm: updatedOrderForm,
      formIsValid
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
            isInValid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={e => {
              this.inputChangeHandler(e, formElement.id);
            }}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
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
