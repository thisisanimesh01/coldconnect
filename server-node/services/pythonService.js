import axios from "axios";

export const sendToPython = async (payload) => {
  const url = "http://127.0.0.1:8000/send-email";
  const res = await axios.post(url, payload);
  return res.data;
};