const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

let token = localStorage.getItem('token') || '';
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${token.replace('__q_strn|', '')}`
}

const config = {
  API_BASE_URL: window?.appConfig?.API_BASE_URL || process.env.API_BASE_URL
}

export function getEnv(name) {
  return config[name];
}

export const getAllUsers = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "get",
      url: `${getEnv('API_BASE_URL')}/users/getall/`,
      params: payload,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}

export const getOneUser = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "get",
      url: `${getEnv('API_BASE_URL')}/users/getone`,
      params: payload,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res;
}

// PROFILES!
export const getAllUserTypes = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "get",
      url: `${getEnv('API_BASE_URL')}/users/usertype/`,
      params: payload,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}

export const updateProfile = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "post",
      url: `${getEnv('API_BASE_URL')}/users/update/`,
      data: payload.data,
      params: payload.params,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}

export const updatePassword = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "post",
      url: `${getEnv('API_BASE_URL')}/users/update/password/`,
      data: payload,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}

export const updateESign = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "post",
      url: `${getEnv('API_BASE_URL')}/users/upload/`,
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      },
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}

