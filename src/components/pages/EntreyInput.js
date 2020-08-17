import React, { useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
import { toMoment, toMomentDuration } from "@fullcalendar/moment";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import moment from "moment";
import { POSTData, DELETEData, PUTData } from "../utiles/PointAPI";
import useGlobal from "../GlobleState/store";
import "./PagesCss/styles.css";

//todo 1 set up default get state from server
//todo 2 update state when adding a new entrey so not have to get full state again.
//todo 3 be able to delet eentrey
//todo 4 set up ability to update entrey
//todo 5 create download link on git hub releasces

export default function EntreyInput() {
  const [globalState, globalActions] = useGlobal();
  const [weekendsVisible, setWeekendsVisible] = React.useState(true);
  const [currentEvents, setCurrentEvents] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("null");
  const [selectInfo, setselectInfo] = React.useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (value) => {
    addNewEvent();
    setOpen(false);
  };
  const handleClose = (value) => {
    console.log(value);
    setOpen(false);
  };
  useEffect(() => {
    reGettingNewState();
  }, [globalState.entrys]);

  const reGettingNewState = () => {
    let replaceKeyInObjectArray = (a, r) =>
      a.map((o) =>
        Object.keys(o)
          .map((key) => ({ [r[key] || key]: o[key] }))
          .reduce((a, b) => Object.assign({}, a, b))
      );

    const replaceMap = { event_start: "start", event_end: "end", _id: "id" };
    const calendarEntrys = replaceKeyInObjectArray(
      globalState.entrys,
      replaceMap
    );
    // changes the date format to a format it can handle
    calendarEntrys.map((elm, i, y) => {
      elm.start = moment(elm.start).format("");
      elm.end = moment(elm.end).format("");
    });
    // sets the state so it can load events value in calender
    setEvents({ events: calendarEntrys });
    console.log("running calender set up");
  };
  const addNewEvent = async () => {
    console.log(inputValue);
    let name = inputValue;
    console.log(selectInfo.view);
    console.log("running addNewEvent");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (name) {
      let duration =
        moment(selectInfo.end).diff(moment(selectInfo.start), "hours") +
        ":" +
        Math.floor(
          moment(selectInfo.end).diff(moment(selectInfo.start), "minutes") % 60
        );

      duration.split(":")[0] < 10 && (duration = "0" + duration);
      duration.split(":")[1] < 10 && (duration = duration + "0");

      let obj = {
        title: name,
        event_start: moment(selectInfo.start).format("MM/D/YYYY hh:mm a"),
        event_duration: duration,
        event_end: moment(selectInfo.end).format("MM/D/YYYY hh:mm a"),
        date: moment().format("MM/D/YYYY"),
      };
      await POSTData(obj).then((res) => {
        calendarApi.addEvent({
          id: res._id,
          title: name,
          start: moment(selectInfo.end).format("MM/D/YYYY hh:mm a"),
          end: moment(selectInfo.end).format("MM/D/YYYY hh:mm a"),
        });
        obj._id = res._id;
        console.log("just posted");
      });
      globalActions.calendarApendEntry(obj);
    }
    //todo append to
    reGettingNewState();
  };

  const handleCreateNewEntry = async (calendarVlaue) => {
    setselectInfo(calendarVlaue);
    handleClickOpen();
  };

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
      DELETEData(clickInfo.event.id);
      globalActions.calendarDeleteEntry(clickInfo.event.id);
      // todo update state, delete item from state
      reGettingNewState();
    }
  };

  const updatesState = (someKindOfData) => {
    setCurrentEvents({
      currentEvents: someKindOfData,
    });
  };

  return (
    <div className="demo-app">
      <div className="Dialog-prompt">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter Title</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Put a name to what you have been doing.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="eventTitle"
              label="Title Event"
              fullWidth
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* {this.renderSidebar()} */}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            momentPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="timeGridDay"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={events}
          // initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
          select={handleCreateNewEntry}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={updatesState} // called after events are initialized/added/changed/removed
          //  you can update a remote database when these fire:
          titleFormat={moment().format("MM/D/YYYY")}
          eventAdd={function () {
            console.log("event added");
          }}
          eventChange={function (event) {
            let oldEvent = globalState.entrys.find(
              (entry) => entry._id === event.event.id
            );

            var newEvent = {
              createdAt: oldEvent.createdAt,
              date: oldEvent.date,
              event_duration: oldEvent.event_duration,
              event_start: String(event.event.start),
              event_end: String(event.event.end),
              title: event.event.title,
              __v: oldEvent.__v,
              _id: oldEvent._id,
            };

            globalActions.setUpdateEntryState(newEvent);

            PUTData(event.event.id, {
              event_start: event.event.start,
              event_end: event.event.end,
              title: event.event.title,
            });
            reGettingNewState();
          }}
          eventRemove={function () {
            console.log("event deleted");
          }}
        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      {/* <a>{console.log(eventInfo)}</a> */}
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {/* {formatDate(event.start, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })} */}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

//   renderSidebar() {
//     return (
//       <div className="demo-app-sidebar">
//         <div className="demo-app-sidebar-section">
//           <h2>Instructions</h2>
//           <ul>
//             <li>Select dates and you will be prompted to create a new event</li>
//             <li>Drag, drop, and resize events</li>
//             <li>Click an event to delete it</li>
//           </ul>
//         </div>
//         <div className="demo-app-sidebar-section">
//           <label>
//             <input
//               type="checkbox"
//               checked={this.state.weekendsVisible}
//               onChange={this.handleWeekendsToggle}
//             ></input>
//             toggle weekends
//           </label>
//         </div>
//         <div className="demo-app-sidebar-section">
//           <h2>All Events ({this.state.currentEvents.length})</h2>
//           <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
//         </div>
//       </div>
//     );
//   }
