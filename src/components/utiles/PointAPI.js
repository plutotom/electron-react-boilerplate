import axios from "axios";
//========================GET============================
export async function GETData() {
  try {
    const res = await axios.get("http://localhost:5000/uploadDatapoint");

    // console.log(res.data.count);
    // return await res.data;
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
}
//========================POST============================
export async function POSTData(dataincome) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://localhost:5000/uploadDatapoint",
      dataincome,
      config
    );

    // console.log(res.data);
    return await res.data.data;
  } catch (err) {
    console.log(err.response.data.error);
    return err.response.data;
  }
}
//====================PUT================================
export async function PUTData(id, body) {
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `http://localhost:5000/uploadDatapoint/${id}`,
      body,
      headers
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
//======================DELETE==============================
export async function DELETEData(id) {
  try {
    const res = await axios.delete(
      `http://localhost:5000/uploadDatapoint/${id}`
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//========================GET-Settings============================
export async function GETSettings() {
  try {
    const res = await axios.get("http://localhost:5000/settings");

    // console.log(res.data.count);
    // return await res.data;
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//======================PUT-Settigns==============================

export async function PUTSettings(defaultDuration) {
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `http://localhost:5000/settings/update`,
      defaultDuration,
      headers
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
