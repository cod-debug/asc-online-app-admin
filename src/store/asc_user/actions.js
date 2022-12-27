const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

let prefix = "/api/v1";
let token = localStorage.getItem('token') || '';
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${token.replace('__q_strn|', '')}`
}

const config = {
  API_BASE_URL: window?.appConfig?.ASC_USER_BASE_URL || process.env.ASC_USER_BASE_URL
}

export function getEnv(name) {
  return config[name];
}

export const reassign = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "put",
        url: `${getEnv('API_BASE_URL')}${prefix}/asc-user/reassign-application/${payload.id}`,
        data: payload.data,
        headers: headers,
        })
    } catch (e) {
        console.log(e);
        res.data = e.response.data
        res.status = e.response.status
    }
    return res
}

export const lockApp = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "put",
        url: `${getEnv('API_BASE_URL')}${prefix}/asc-user/lock-application/${payload.id}`,
        data: payload,
        headers: headers,
        })
    } catch (e) {
        console.log(e);
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}

export const comment = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "put",
      url: `${getEnv('API_BASE_URL')}${prefix}/asc-user/make-comment/${payload.id}`,
      data: payload.data,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res;
}


export const getSpecific = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "get",
      url: `${getEnv('API_BASE_URL')}${prefix}/asc-user/view-application/${payload.id}`,
      headers: headers,
      })
  } catch (e) {
      res.data = e?.response?.data || null
      res.status = e?.response?.status || null
  }
  return res;
}

export const getCountByUser = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "get",
      url: `${getEnv('API_BASE_URL')}${prefix}/asc-user/view-counts/per-user/`,
      headers: headers,
      })
  } catch (e) {
      res.data = e?.response?.data || null
      res.status = e?.response?.status || null
  }
  return res;
}

export const getCountByRole = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "get",
      url: `${getEnv('API_BASE_URL')}${prefix}/asc-user/view-counts/per-role/`,
      headers: headers,
      })
  } catch (e) {
      res.data = e?.response?.data || null
      res.status = e?.response?.status || null
  }
  return res;
}

export const getPerReleaseStatus = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "POST",
      url: `${getEnv('API_BASE_URL')}${prefix}/asc-user/view-application/per-release-status/`,
      data: payload.data,
      headers: headers,
      })
  } catch (e) {
      res.data = e?.response?.data || null
      res.status = e?.response?.status || null
  }
  return res;
}