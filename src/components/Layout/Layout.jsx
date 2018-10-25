import React from "react";
import classes from "./Layout.module.css";
const Layout = props => (
  <>
    <div>sidebar</div>
    <main className={classes.Content}> {props.children} </main>
  </>
);
export default Layout;
