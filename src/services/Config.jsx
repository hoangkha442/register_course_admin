import axios from "axios";
import { userLocalStorage } from "./LocalService";
import { batLoading, tatLoading } from "../redux/spinnerSlice";
import { storeAdmin,  } from "..";

export const https = axios.create(
    {
        baseURL: 'http://localhost:8080/',
        headers:{
            Authorization: "Bearer " + userLocalStorage?.get()?.token, 
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