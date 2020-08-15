import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import clsx from "clsx";

import HomePage from "../pages/HomePage";
import MiniDrawerSide from "../SidBarNav/MiniDrawerSide";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import States from "../pages/States";
import OutterHomePage from "../pages/OutterHomePage";
import Loginpage from "../pages/LoginPage";
import EntreyInput from "../pages/EntreyInput";

import useGlobal from "../GlobleState/store";

function MainRoutes(props) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState();
  const [hasAuth, sethasAuth] = React.useState(true);
  const [globalState, globalActions] = useGlobal();
  const { classes } = props;

  useEffect(() => {
    //this is getting state from server to set up the settings that this user
    globalActions.settingDefaultState();
    globalActions.entrysDefaultState();
  }, []);

  return (
    <Router>
      {hasAuth ? (
        <div>
          <MiniDrawerSide openHandeler={setOpen} openState={open} />
          <div // moving content over when side bar open.
            className={clsx({
              [classes.open]: open,
              [classes.close]: !open,
            })}
          >
            <Route exact path="/EntreyInput" component={EntreyInput} />
            <Route exact path="/internalHomePage" component={HomePage} />
            <Route exact path="/states" component={States} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/settings" component={Settings} />
          </div>
        </div>
      ) : (
        <div>
          <Route exact path="/outterHomePage" component={OutterHomePage} />
          <Route exact path="/login" component={Loginpage} />
        </div>
      )}
    </Router>
  );
}

export default withStyles(styles)(MainRoutes);
