const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

// window?.appConfig ?

const config = {
  API_BASE_URL: window?.appConfig?.API_BASE_URL || process.env.API_BASE_URL
}

export function getEnv(name) {
  return config[name];
}

export const getAllEmployees = async ({ commit }, payload) => {
  let res = await axios({
    url: 'http://127.0.0.1:8000/all-employees/',
    method: "get",
  })
  return res;
}

export const registerApplicant = async ({ commit }, payload) => {
  let res = {};
  try {
    res = await axios({
      url: `${getEnv("API_BASE_URL")}/users/register/applicant`,
      data: payload,
      method: "post",
    })
  } catch (e) {
    res.data = e.response.data
    res.status = e.response.status
  }
  return res;
}

export const login = async ({ commit }, payload) => {
  let res = {};
  try {
    res = await axios({
      url: `${getEnv("API_BASE_URL")}/users/login`,
      data: payload,
      method: "post",
    })
  } catch (e) {
    res.data = e.response.data
    res.status = e.response.status
  }
  return res;
}

// /users/login
