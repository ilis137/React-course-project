import React, { Component } from "react";
import * as actions from "../../../Store/actions/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.authLogout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
