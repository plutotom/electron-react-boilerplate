import React, { Component } from "react";
import ChartTimeline from "../Charts/TimeLine";
import TestingChart from "../Charts/chartjs";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { width } from "@amcharts/amcharts4/.internal/core/utils/Utils";

function States() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper style={{ display: "block" }}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Chart" />
          <Tab label="Time Line" />
          {console.log(value)}
        </Tabs>
      </Paper>
      {value ? <ChartTimeline /> : <TestingChart />}
    </div>
  );
}

export default States;
