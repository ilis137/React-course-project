import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import BackDrop from "../../UI/BackDrop/BackDrop";
const SideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.close];

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.open];
  }
  return (
    <>
      <BackDrop show={props.open} click={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
