import axios from "axios";

let url = "";
if(process.env.NODE_ENV === 'production'){
  console.log("prod");
  url = process.env.REACT_APP_PRODUCTION_BACK_URL;
}else{
  console.log("dev");
  url = process.env.REACT_APP_DEV_BACK_URL;
}

console.log("url",url);

export const apiReq = axios.create({
  // baseURL
  // baseURL:"https://demo1-backend.onrender.com",
  // baseURL:"http://localhost:4000/api/v1",
  baseURL: url,
  withCredentials: true,
});