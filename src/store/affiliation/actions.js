const { LocalStorage, Notify } = require("quasar");
import axios from "axios";


const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
// window?.appConfig ?

const config = {
  API_BASE_URL: window?.appConfig?.API_BASE_URL || process.env.API_BASE_URL
}

export function getEnv(name) {
  return config[name];
}

export const getAllAffiliation = async ({ commit }, payload) => {
  let res = {};
  try {
    res = await axios({
      url: `${getEnv("API_BASE_URL")}/affiliate/getall/`,
      params: payload,
      method: "get",
      headers: headers,
    })
  } catch (e) {
    res.data = e.response.data;
    res.status = e.response.status;
  }
  return res;
}


export const addAffiliation = async ({ commit }, payload) => {
  let res = {};
  try {
    res = await axios({
      url: `${getEnv("API_BASE_URL")}/affiliate/create/`,
      data: payload,
      method: "post",
      headers: headers,
    })
  } catch (e) {
    res.data = e.response.data
    res.status = e.response.status
  }
  return res;
}


export const updateAffiliation = async ({ commit }, payload) => {
  let res = {};
  try {
    res = await axios({
      url: `${getEnv("API_BASE_URL")}/affiliate/update/?id=${payload.id}`,
      data: payload,
      method: "post",
      headers: headers,
    })
  } catch (e) {
    res.data = e.response.data
    res.status = e.response.status
  }
  return res;
}
