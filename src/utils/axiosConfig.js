import axios from "axios";
const url = `https://reqres.in/api`;
const API = axios.create({
  baseURL: url,
});


export default API;