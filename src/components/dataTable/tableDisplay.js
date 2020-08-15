import React, { useEffect } from "react";
import moment from "moment";

import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import useGlobal from "../GlobleState/store";
import { GETData, POSTData, DELETEData, PUTData } from "../utiles/PointAPI";

export default function MaterialTableDemo() {
  const [globalState, globalActions] = useGlobal();
  // / ####################################### Colums lay out ###############################################
  const [state, setState] = React.useState({
    columns: [
      { title: "Name of Task", field: "title" },
      // ####################################### Date ###############################################
      {
        title: "Date",
        field: "date",
        editComponent: (props) => (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              showTodayButton
              variant="dialog"
              ampm={true}
              label="With keyboard"
              value={
                props.value ||
                (props.rowData.date = moment().format("MM/DD/YYYY"))
              }
              onChange={(e) => props.onChange(e.format("MM/DD/YYYY"))}
            />
          </MuiPickersUtilsProvider>
        ),
      },
      // ####################################### StartTime ###############################################
      {
        title: "Start Time",
        field: "event_start",
        editComponent: (props) => (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDateTimePicker
              showTodayButton
              variant="dialog"
              ampm={true}
              label="With keyboard"
              value={
                props.value ||
                (props.rowData.event_start = moment()
                  .subtract(30, "minutes")
                  .format("MM-DD-YYYY hh:mm a")
                  .toString())
              }
              onChange={(e) => StartTimeHandeler(e, props)}
              onError={console.log}
              // disablePast
              // format="yyyy-MM-dd HH:mm"
            />
          </MuiPickersUtilsProvider>
        ),
      },

      // ####################################### TimeSpent ###############################################
      {
        title: "Time spent",
        field: "event_duration",
        editComponent: (props) => (
          <TextField
            id="standard-basic"
            label="Standard"
            value={
              props.value ||
              (props.rowData.event_duration = globalState.defaultDuration)
            }
            onChange={(e) => timeSpentHandeler(e, props)}
          />
        ),
      },
      // ####################################### EndTime ###############################################
      {
        // defaultSort: "desc",
        title: "End Time",
        field: "event_end",
        editComponent: (props) => (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDateTimePicker
              showTodayButton
              variant="dialog"
              ampm={true}
              label="With keyboard"
              value={
                props.value ||
                (props.rowData.event_end = moment()
                  .format("MM-DD-YYYY hh:mm a")
                  .toString())
              }
              onChange={(slectedValue) => endTimeHandeler(slectedValue, props)}
              minutesStep={5}
              onError={console.log}
              minDate={props.rowData.event_start}
            />
          </MuiPickersUtilsProvider>
        ),
      },
    ],
    data: [],
  });
  // ############################### event handerlers ##########################################################
  const endTimeHandeler = (slectedValue, data) => {
    // console.log(data);
    // data.onChange(slectedValue.format("MM/DD/YYYY hh:mm a"));

    data.rowData.event_end = slectedValue.format("MM/DD/YYYY hh:mm a");
    let x = moment(data.rowData.event_start);
    let y = moment(data.rowData.event_end);
    data.rowData.event_duration =
      y.diff(x, "hours") + ":" + Math.floor(y.diff(x, "minutes") % 60);
    //settings the event_duration === to the sum of the event_start and event_end

    data.onRowDataChange(data.rowData);
  };
  const StartTimeHandeler = (slectedValue, data) => {
    data.rowData.event_start = slectedValue.format("MM/DD/YYYY hh:mm a");
    let startTime = moment(data.rowData.event_start);
    let endTime = moment(data.rowData.event_end);
    // settings the total time to be === to startTime - endTime
    data.rowData.event_duration =
      endTime.diff(startTime, "hours") +
      ":" +
      Math.floor(endTime.diff(startTime, "minutes") % 60);
    data.onRowDataChange(data.rowData);
  };

  const timeSpentHandeler = (e, props) => {
    props.rowData.event_duration = e.target.value;

    if (!props.rowData.hasOwnProperty("event_end")) {
      // if no event_end value, then add default value
      props.rowData.event_end = moment()
        .subtract(30, "minutes")
        .format("MM/DD/YYYY hh:mm a");
      props.rowData.event_end = props.rowData.event_end.toString();
    }

    if (!props.rowData.hasOwnProperty("event_start")) {
      props.rowData.event_start = moment().format("MM/DD/YYYY hh:mm a");
      props.rowData.event_start = props.rowData.event_start.toString();
    }
    if (!props.rowData.hasOwnProperty("date")) {
      props.rowData.date = moment();
    }

    props.rowData.event_end = moment(props.rowData.event_start).add(
      props.rowData.event_duration,
      "hours"
    );
    props.rowData.event_end = props.rowData.event_end.format(
      "MM/DD/YYYY hh:mm a"
    );
    // sets all the data we just changed to the data schema
    props.onRowDataChange(props.rowData);
  };

  // Getting init data
  useEffect(() => {
    GETData().then((res) => {
      setState((prevState) => {
        const data = [...prevState.data];
        data.push(...res);
        return { ...prevState, data };
      });
    });
  }, []);

  return (
    <div>
      {/* exportFileName?:
    | string
    | ((columns: Column<RowData>, data: string[][]) => string);
  exportCsv?: (columns: any[], renderData: any[]) => void; */}

      <MaterialTable
        // onAdd={(e) => (!e.title ? console.log("i am null") : null)}
        // emptyValue={(e) => console.log(e, " this is emptyValue")}
        options={{
          toolbar: true,
          selection: true,
          pageSizeOptions: [5, 10, 20, 30, 50, 100],
          pageSize: 5,
          grouping: true,
          addRowPosition: "first",
          sorting: true,
          exportButton: true,
          exportAllData: true,
          // exportCsv: (columns, data) => {
          //   alert(
          //     "You should develop a code to export " + data.length + " rows"
          //   );
          // },
        }}
        title="Your Day"
        columns={state.columns}
        data={state.data.reverse()}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                // assings the _id recived from mongoDB server to the object.
                //adds id from server to iteme on client
                POSTData(newData).then((res) => (newData._id = res._id));
                console.log(newData);
                if (newData.title === undefined) {
                  newData.title = "No Title";
                }

                data.push(newData);
                console.log(data);
                return { ...prevState, data };
              });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                PUTData(oldData._id, newData);
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;

                    return { ...prevState, data };
                  });
                }
              }, 1);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  DELETEData(oldData._id);
                  return { ...prevState, data };
                });
              }, 1);
            }),
        }}
      />
    </div>
  );
}
