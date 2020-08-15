import React from "react";
import useGlobalHook from "./useGlobalHook";
import * as actions from "./actions.js";
import { GETSettings, GETData } from "../utiles/PointAPI";

const initialState = {
  defaultDuration: "",
  entrys: [],
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
