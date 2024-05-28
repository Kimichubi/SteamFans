import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

const api = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
