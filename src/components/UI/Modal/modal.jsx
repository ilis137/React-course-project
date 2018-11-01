import React, { Component } from "react";
import classes from "./modal.module.css";
import BackDrop from "../BackDrop/BackDrop";
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.show !== nextProps.show;
  }
  componentWillUpdate() {
    console.log("component will update");
  }
  render() {
    return (
      <>
        <BackDrop show={this.props.show} click={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}
export default Modal;
