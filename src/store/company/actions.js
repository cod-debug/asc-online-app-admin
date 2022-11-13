const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

let token = localStorage.getItem('token') || '';
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${token.replace('__q_strn|', '')}`
}
// window?.appConfig ?

const config = {
  API_BASE_URL: window?.appConfig?.API_BASE_URL || process.env.API_BASE_URL
}

export function getEnv(name) {
  return config[name];
}

export const getAllCompanies = async ({ commit }, payload) => {
  let res = null;
  try {
    res = await axios({
      method: "get",
      url: `${getEnv("API_BASE_URL")}/company-list/getall/`,
      params: payload,
      headers: headers,
    })
  } catch (e) {
    res.data = e
    res.status = 400
  }
  return res;
}


export const getListCompanies = async ({ commit }, payload) => {
  let res = {};
  try {
    res = await axios({
      method: "get",
      url: `${getEnv("API_BASE_URL")}/company/getlist/`,
      params: payload,
      headers: headers,
    })
  } catch (e) {
    res.data = e
    res.status = 400
  }
  return res;
}

export const addCompany = async ({ commit }, payload) => {
  let res = {};
  try {
    res = await axios({
      url: `${getEnv("API_BASE_URL")}/company/create/`,
      data: payload,
      method: "post",
      headers: headers,
    })
  } catch (e) {
    res.data = e
    res.status = 400
  }
  return res;
}
