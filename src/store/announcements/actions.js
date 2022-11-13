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

export const addAnnouncement = async ({ commit }, payload) => {
  let res = await axios({
    url: `${getEnv('API_BASE_URL')}/announce/create`,
    data: payload,
    method: "post",
    headers: headers,
  })
  return res;
}

export const getAllAnnouncements = async ({ commit }, payload) => {
  let res = await axios({
    url: `${getEnv('API_BASE_URL')}/announce/getall`,
    params: payload,
    method: "get",
    headers: headers,
  })
  return res;
}

export const getSpecificAnnouncement = async ({ commit }, payload) => {
  let res = await axios({
    url: `${getEnv('API_BASE_URL')}/announce/getone`,
    params: payload,
    method: "get",
    headers: headers,
  })
  return res;
}


export const updateAnnouncement = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "post",
      url: `${getEnv('API_BASE_URL')}/announce/update/?id=${payload.id}`,
      data: payload.data,
      headers: headers,
      })
  } catch (e) {
      res.data = e.response.data
      res.status = e.response.status
  }
  return res;
}


