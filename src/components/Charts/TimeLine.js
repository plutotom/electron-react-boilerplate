import React, { Component } from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { GETData } from "../utiles/PointAPI";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
class ChartTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };

    this.componentDidMount = () => {
      GETData().then((res) => {
        this.setState({ data: res });
      });
    };
  }
  render() {
    return (
      <Timeline align="alternate">
        {this.state.data.map((elm, i) => {
          return (
            <TimelineItem key={`t${i}`}>
              <TimelineSeparator key={`d${i}`}>
                <TimelineDot key={`s${i}`} />
                <TimelineConnector
                  style={{ backgroundColor: "#f44336" }}
                  key={`a${i}`}
                />
              </TimelineSeparator>

              <TimelineContent key={`w${i}`}>
                <Paper elevation={3} style={{ padding: "6px 16px" }}>
                  <Typography variant="h6" component="h1">
                    {elm.title}
                    {": " + elm.event_duration + " hours"}
                  </Typography>
                  <Typography variant="h6" component="p">
                    {moment(elm.event_start).format("hh:mm a").toUpperCase()} -{" "}
                    {moment(elm.event_end).format("hh:mm a").toUpperCase()}
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    );
  }
}

export default ChartTimeline;
