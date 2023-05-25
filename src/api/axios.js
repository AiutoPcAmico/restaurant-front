import axios from "axios";

console.log(process.env.REACT_APP_API);

const instance = axios.create({
  // .. where we make our configurations
  baseURL: process.env.REACT_APP_API,
});

export default instance;
