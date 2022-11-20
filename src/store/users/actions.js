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


export const approveUser = async ({ commit }, payload) => {
  let res = await axios({
    url:
      process.env.API_URL +
      `/apprv/${payload.id}`,
    method: "post",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token').replace('__q_strn|', '')}`
    }
  })
  return res;
}

export const registerUser = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "post",
      url: `${getEnv('API_BASE_URL')}/users/register/employee`,
      data: payload,
      headers: headers,
      })
  } catch (e) {
      res.data = e.response.data
      res.status = e.response.status
  }
  return res;
}

export const updateUser = async ({ commit }, payload) => {
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
      res.data = e.response.data
      res.status = e.response.status
  }
  return res;
}

export const getCurrentUser = async ({ commit }, payload) => {
  let res = null;
  try {
    res = await axios({
      url: `${getEnv("API_BASE_URL")}/users/logged-in`,
      method: "get",
      headers: payload,
    })
  } catch (e) {
    res.data = e
    res.status = 400
  }
  return res;
}