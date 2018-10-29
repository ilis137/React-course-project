import React from "react";
import classes from "./Button.module.css";
const Button = props => (
  <div
    onClick={props.clicked}
    className={[classes.Button, classes[props.btnType]].join(" ")}
  >
    {props.children}
  </div>
);
export default Button;
