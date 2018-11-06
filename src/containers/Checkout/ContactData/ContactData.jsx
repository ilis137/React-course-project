import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact info:</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="name"
          />
          <input
            className={classes.Input}
            type="text"
            name="email"
            placeholder="email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="street"
          />
          <input
            className={classes.Input}
            type="text"
            name="postalCode"
            placeholder="postalCode"
          />
          <Button btnType="Success">Order</Button>
        </form>
      </div>
    );
  }
}
export default ContactData;
