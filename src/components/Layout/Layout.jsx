import React from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
const Layout = props => (
  <>
    <Toolbar />
    <div>sidebar</div>
    <main className={classes.Content}> {props.children} </main>
  </>
);
export default Layout;
