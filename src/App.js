import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import styles from "./styles";
import HomePage from "./components/pages/HomePage";
import MiniDrawer from "./components/SidBarNav/MiniDrawerSide";
// import "/style.sass";
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.sideBarClosed}>
        <MiniDrawer />
        <HomePage />
      </div>
    );
  }
}

export default withAuth0(withStyles(styles)(App));
