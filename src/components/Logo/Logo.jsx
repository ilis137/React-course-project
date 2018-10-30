import React from "react";
import logo from "../../assets/burger-logo.png";
import classes from "./Logo.module.css";
const Logo = props => (
  <div className={classes.logo}>
    <img src={logo} alt="burger logo" />
  </div>
);

export default Logo;
