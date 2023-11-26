import axios from "axios";
import { userLocalStorage } from "./LocalService";
import { batLoading, tatLoading } from "../redux/spinnerSlice";
import { storeAdmin,  } from "..";

export const https = axios.create(
    {
        baseURL: 'https://elearningnew.cybersoft.edu.vn',
        headers:{
            tokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NCIsIkhldEhhblN0cmluZyI6IjI0LzA2LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwMzM3NjAwMDAwMDAwIiwiaWF0IjoxNzAwOTY1MTI3fQ.RmqB24Zmi7WatJYLfKwAjCekXIAhyc34mOiKN08WEBE',
            Authorization: "Bearer " + userLocalStorage.get()?.accessToken, 
        }
    }   
)
// Add a request interceptor
https.interceptors.request.use(function (config) {
    storeAdmin.dispatch(batLoading())
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
https.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    storeAdmin.dispatch(tatLoading())

    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    storeAdmin.dispatch(tatLoading())

    return Promise.reject(error);
  });