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


export const getCurrentUser = async ({ commit }, payload) => {
  let res = null;
  try {
    res = await axios({
      url: `${getEnv("API_BASE_URL")}/users/logged-in`,
      data: payload,
      method: "get",
      headers: headers,
    })
  } catch (e) {
    res.data = e
    res.status = 400
  }
  return res;
}