import React from "react";
import classes from "./modal.module.css";
import BackDrop from "../BackDrop/BackDrop";
const modal = props => {
  return (
    <>
      <BackDrop show={props.show} click={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        {props.children}
      </div>
    </>
  );
};
export default modal;
