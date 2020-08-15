import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";
import useGlobal from "../GlobleState/store";
import { PUTSettings } from "../utiles/PointAPI";
import Button from "@material-ui/core/Button";

export default function Settings(props) {
  const [settings, setSettings] = React.useState(null);
  const [globalState, globalActions] = useGlobal();

  return (
    <div>
      {settings ? console.log(settings.defaultDuration) : null}
      <h1> this is settings page</h1> <br />
      <TextField
        id="default-duration"
        label="Default Time Spent"
        value={globalState.defaultDuration}
        onChange={(e) => globalActions.changeDuration(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          let defaultDuration = globalState.defaultDuration;
          PUTSettings({ defaultDuration });
        }}
      >
        Save settings.
      </Button>
      <br />
      <p style={{ padding: "20px" }}>
        You have to hit save or else your changes will not apply
      </p>
    </div>
  );
}
