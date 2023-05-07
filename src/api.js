import axios from "axios";

export const apiReq = axios.create({
  // baseURL
  // baseURL:"https://demo1-backend.onrender.com",
  // baseURL:"http://localhost:4000/api/v1",
  baseURL: "demo2-production.up.railway.app/api/v1",
  withCredentials: true,
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  // },
});