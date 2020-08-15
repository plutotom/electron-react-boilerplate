import React from "react";
import LoginPage from "./LoginPage";

const OutterHomePage = () => {
  return (
    <div>
      <h3>
        you are not loged in, here is some information about my applacation that
        you may find helpful before you log in
      </h3>
      <br />
      <h4>
        log in button should be around some where and it will take you to the
        inner side of the applacation.
      </h4>
      <LoginPage />
    </div>
  );
};

export default OutterHomePage;
