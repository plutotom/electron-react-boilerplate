// gets the users settings from mongo server
import { GETSettings, GETData } from "../utiles/PointAPI";
export const settingDefaultState = async (store, value) => {
  store.state.defaultDuration = GETSettings().then((data) => {
    store.setState({ defaultDuration: data.defaultDuration });
  });
};

// changes the settings of default duration
export const changeDuration = (store, value) => {
  const thing = (store.state.defaultDuration = value);
  store.setState({ thing });
};

// Gets the users entreys when app boots up
export const entrysDefaultState = async (store) => {
  let data = await GETData().then((res) => {
    store.setState((store.state.entrys = [...res]));
  });
};

// sets any new entreys to state user adds
export const setUpdateEntryState = (store, newValue) => {
  let finalObj = null;

  store.state.entrys.map((elm, i, y) => {
    if (elm._id === newValue._id) {
      console.log("new obj", newValue, "old object", elm);
      y[i] = newValue;
      finalObj = y;
    }
  });

  store.setState((store.state.entrys = finalObj));
};

export const calendarApendEntry = (store, newValue) => {
  console.log("running calendarApendEntry", newValue);

  var temp = store.state.entrys;
  temp.push(newValue);
  console.log(typeof temp);
  store.setState((store.state.entrys = temp));
};

export const calendarDeleteEntry = (store, id) => {
  let temp = store.state.entrys;

  store.state.entrys.map((elm, i, y) => {
    if (elm._id === id) {
      temp.splice(i);
    }
  });
  console.log(temp);
  store.setState((store.state.entrys = temp));
};
